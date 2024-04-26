import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function judulToLink(judul: string) {
  return judul.split(" ").join("_");
}

export function linkToJudul(link: string) {
  return link.split("_").join(" ");
}
