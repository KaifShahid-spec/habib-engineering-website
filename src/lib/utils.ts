import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind classes merge karne ke liye (shadcn/ui requirement).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Date ko readable format mein badalta hai.
 * Example: "12 Nov 2026"
 */
export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Date aur Time dono dikhata hai.
 * Example: "12 Nov 2026, 11:15 PM"
 */
export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Text ko URL-friendly slug mein badalta hai.
 * Example: "Oil Immersed Transformer" -> "oil-immersed-transformer"
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^\w-]+/g, "") // remove non-word chars
    .replace(/--+/g, "-"); // replace multiple hyphens
}

/**
 * Long text ko cut karke "..." lagata hai.
 * Used in cards for excerpts.
 */
export function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Number ko formatted string mein badalta hai.
 * Example: 5000 -> "5,000"
 */
export function formatNumber(num: number | string) {
  return new Intl.NumberFormat("en-US").format(Number(num));
}

/**
 * Initials nikalta hai (for avatars).
 * Example: "Habib Engineering" -> "HE"
 */
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Slug ko wapas Title Case mein badalta hai (for breadcrumbs).
 * Example: "oil-immersed" -> "Oil Immersed"
 */
export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}