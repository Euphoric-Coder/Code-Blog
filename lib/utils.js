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

