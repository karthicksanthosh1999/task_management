import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isoDateFormat = (isoDate: Date) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);

  const formateDate = date.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    hour12: false,
  });

  return formateDate;
};

export const isoDateFormatForChart = (isoDate: Date) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);

  const formateDate = date.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formateDate;
};
