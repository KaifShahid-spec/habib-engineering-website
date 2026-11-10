import type { Database } from "./database";

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

// UI mein filter karne ke liye
export type ProjectFilter = {
  sector?: string;
  city?: string;
  year?: number;
};