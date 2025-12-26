import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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