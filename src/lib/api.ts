import { urlJoin } from "@/lib/utils";
import axios from "axios";
import errors from "@/lib/errors";
import { BACKEND_URL, IMAGE_HOST } from "./settings";
import STATUS from "@/lib/status";
import { type Configuration } from "@/lib/types";

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
      urlJoin(BACKEND_URL, "/auth/token/"),
      formdata,
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      switch (status) {
        case STATUS.HTTP_401_UNAUTHORIZED:
          throw new errors.InvalidCredentialsError(
            "The password provided is incorrect.",
            STATUS.HTTP_401_UNAUTHORIZED,
          );
        case STATUS.HTTP_404_NOT_FOUND:
          throw new errors.UserNotFoundError(
            "A user with this username does not exist.",
            STATUS.HTTP_404_NOT_FOUND,
          );
        case STATUS.HTTP_500_INTERNAL_SERVER_ERROR:
          throw new errors.ServerError(
            "Something went wrong on the server.",
            STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
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
  let email = formdata.get("email");

  if (email === "") {
    email = null;
  }

  const response = await axios.post(urlJoin(BACKEND_URL, "/users/"), {
    username: formdata.get("username"),
    email: email,
    password: formdata.get("password"),
  });
  return response.data;
}

export async function getAllCuisines() {
  const response = await axios.get(urlJoin(BACKEND_URL, "/categories/"));
  return response.data;
}

export async function getCuisineByName(cuisineName: string) {
  const response = await axios.get(
    urlJoin(BACKEND_URL, `/categories/${cuisineName}`),
  );
  return response.data;
}

export async function getUserbyUsername(username: string) {
  const response = await axios.get(urlJoin(BACKEND_URL, `/users/${username}`));
  return response.data;
}

export async function updateUserProfilePicture(formdata: FormData) {
  const response = await axios.put(
    urlJoin(BACKEND_URL, `/users/img`),
    formdata,
  );
  return response.data;
}

export async function updateUserEmail(formdata: FormData) {
  const response = await axios.put(urlJoin(BACKEND_URL, `/users/email`), {
    email: formdata.get("email"),
    password: formdata.get("password"),
    id: formdata.get("id"),
  });
  return response.data;
}

export async function getConfiguration(): Promise<Configuration> {
  const response = await axios.get(
    urlJoin(BACKEND_URL, `/health/configuration`),
  );
  return response.data;
}

export async function healthImageHost(): Promise<boolean> {
  try {
    const response = await axios.get(IMAGE_HOST);
    return response.status === STATUS.HTTP_200_OK;
  } catch {
    return false;
  }
}

/**
 * Fetches all users from the backend API.
 *
 * Sends a GET request to the `/users/` endpoint of the backend server and returns the response data.
 *
 * @returns {Promise<any>} A promise that resolves to the list of users returned by the backend.
 * @throws {AxiosError} Throws if the HTTP request fails.
 */
export async function getAllUsers() {
  const response = await axios.get(urlJoin(BACKEND_URL, `/users/`));
  return response.data;
}

/**
 * Deletes a user by their unique ID.
 *
 * Sends a DELETE request to the backend API to remove the user with the specified `userId`.
 *
 * @param userId - The unique identifier of the user to delete.
 * @returns A promise that resolves with the response data from the backend.
 * @throws Will throw an error if the request fails.
 */
export async function deleteUserById(userId: number) {
  const response = await axios.delete(urlJoin(BACKEND_URL, `/users/${userId}`));
  return response.data;
}

/**
 * Toggles the role of a user by ID (admin <-> user).
 * @param userId - The ID of the user whose role should be toggled.
 * @returns A promise that resolves to the response data from the server.
 */
export async function toggleUserRole(userId: number) {
  const response = await axios.put(
    urlJoin(BACKEND_URL, `/users/toggle-role/${userId}`),
  );
  return response.data;
}

const api = {
  login,
  signup,
  getUserbyUsername,
  getCuisineByName,
  getAllCategories: getAllCuisines,
  updateUserProfilePicture,
  updateUserEmail,
  getConfiguration,
  healthImageHost,
  getAllUsers,
  deleteUserById,
  toggleUserRole,
};

export default api;
