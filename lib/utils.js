import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getISTDate = () => {
  // Create a new Date object
  const now = new Date();

  // Convert to Indian Standard Time (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is 5 hours 30 minutes ahead of UTC
  const istDate = new Date(now.getTime() + istOffset);

  return istDate.toISOString().split("T")[0]; // Return date in YYYY-MM-DD format
};

export const getISTDateTime = () => {
  // Create a new Date object
  const now = new Date();

  // Use Intl.DateTimeFormat to format the date and time in IST
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };

  // Format the date and time in IST
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(now);

  // Extract individual parts
  const date = `${parts.find((p) => p.type === "year").value}-${
    parts.find((p) => p.type === "month").value
  }-${parts.find((p) => p.type === "day").value}`;
  const time = `${parts.find((p) => p.type === "hour").value}:${
    parts.find((p) => p.type === "minute").value
  }:${parts.find((p) => p.type === "second").value}`;

  return `${date} ${time}`; // Return date and time in "YYYY-MM-DD HH:mm:ss" format
};
