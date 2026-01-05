type RuntimeEnv = {
  BACKEND_URL?: string;
  IMAGE_HOST?: string;
  APP_VERSION?: string;
};

interface AppWindow extends Window {
  __ENV__?: RuntimeEnv;
}

function getRuntimeEnv(): RuntimeEnv {
  if (typeof window !== "undefined" && (window as AppWindow).__ENV__) {
    const env = (window as AppWindow).__ENV__ as RuntimeEnv;

    if (env.BACKEND_URL === "") {
      throw new Error("BACKEND_URL is missing");
    }
    if (env.IMAGE_HOST === "") {
      throw new Error("IMAGE_HOST is missing");
    }

    return env;
  }

  return {};
}
const runtimeEnv = getRuntimeEnv();

export const BACKEND_URL =
  runtimeEnv.BACKEND_URL ??
  import.meta.env.VITE_BACKEND_URL ??
  "http://localhost:7000";

export const IMAGE_HOST =
  runtimeEnv.IMAGE_HOST ??
  import.meta.env.VITE_IMAGE_HOST ??
  "http://localhost:9000";

export const APP_VERSION =
  runtimeEnv.APP_VERSION ?? import.meta.env.VITE_APP_VERSION ?? "dev";

const appSettings = {
  BACKEND_URL,
  IMAGE_HOST,
  APP_VERSION,
};

export default appSettings;
