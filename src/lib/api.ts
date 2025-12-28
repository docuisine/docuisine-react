import { urlJoin } from "@/lib/utils";
import axios from "axios";

export async function login(formdata: FormData) {
  const response = await axios.post(
    urlJoin(import.meta.env.VITE_BACKEND_URL, "/auth/token"),
    formdata
  );
  return response.data;
}

const api = {
  login,
};

export default api;
