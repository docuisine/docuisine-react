import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlJoin(...parts: string[]) {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, ""); // Remove trailing slashes from the first part
      } else {
        return part.replace(/^\/+|\/+$/g, ""); // Remove leading and trailing slashes from other parts
      }
    })
    .filter((part) => part.length > 0) // Remove empty parts
    .join("/");
}

export const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    password.length <= 128 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
};

export const normalizeTitle = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-");

export const unNormalizeTitle = (path: string) =>
  path
    .replace("/", "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
