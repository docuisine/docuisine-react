export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";
export const IMAGE_HOST =
  import.meta.env.VITE_IMAGE_HOST || "http://localhost:9000";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "dev";

const appSettings = {
  BACKEND_URL,
  IMAGE_HOST,
  APP_VERSION,
};

export default appSettings;
