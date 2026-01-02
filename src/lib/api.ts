import { urlJoin } from "@/lib/utils";
import axios from "axios";
import errors from "@/lib/errors";

/**
 * Authenticate a user and retrieve an access token.
 *
 * This function sends login credentials using `FormData`,
 * which is required for OAuth2-compatible endpoints
 * (e.g. FastAPI's OAuth2PasswordRequestForm).
 *
 * @param formdata - FormData containing:
 *   - `username`: string
 *   - `password`: string
 *
 * @returns A promise that resolves to the authentication response
 * containing the `access_token` and `token_type`.
 *
 * @throws AxiosError if the request fails or credentials are invalid.
 */
export async function login(formdata: FormData) {
  try {
    const response = await axios.post(
      urlJoin(import.meta.env.VITE_BACKEND_URL, "/auth/token/"),
      formdata
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status && status >= 500) {
        throw new errors.ServerError(
          "Something went wrong on the server.",
          status
        );
      }

      switch (status) {
        case 401:
          throw new errors.InvalidCredentialsError(
            "The password provided is incorrect.",
            401
          );
        case 404:
          throw new errors.UserNotFoundError(
            "A user with this username does not exist.",
            404
          );
        default:
          throw new Error("Login failed");
      }
    }

    throw err;
  }
}

/**
 * Register a new user account.
 *
 * This function extracts values from FormData and sends them
 * as a JSON payload to the signup endpoint.
 *
 * @param formdata - FormData containing:
 *   - `username`: string
 *   - `email`: string
 *   - `password`: string
 *
 * @returns A promise that resolves to the created user data
 * or a success message from the backend.
 *
 * @throws AxiosError if validation fails or the user already exists.
 */

export async function signup(formdata: FormData) {
  const response = await axios.post(
    urlJoin(import.meta.env.VITE_BACKEND_URL, "/users/"),
    {
      username: formdata.get("username"),
      email: formdata.get("email"),
      password: formdata.get("password"),
    }
  );
  return response.data;
}

export async function getAllCategories() {
  const response = await axios.get(
    urlJoin(import.meta.env.VITE_BACKEND_URL, "/categories/")
  );
  return response.data;
}

export async function getUserbyUsername(username: string) {
  const response = await axios.get(
    urlJoin(import.meta.env.VITE_BACKEND_URL, `/users/${username}`)
  );
  return response.data;
}

export async function updateUserProfilePicture(
  formdata: FormData
) {
  const response = await axios.put(
    urlJoin(import.meta.env.VITE_BACKEND_URL, `/users/img`),
    formdata
  );
  return response.data;
}

const api = {
  login,
  signup,
  getUserbyUsername,
  getAllCategories,
  updateUserProfilePicture,
};

export default api;
