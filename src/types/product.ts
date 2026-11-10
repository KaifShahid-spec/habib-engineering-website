import type { Database } from "./database";

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type ProductRow = Database["public"]["Tables"]["products"]["Row"];

// Product ke sath uski category ka data (JOIN queries ke liye)
export type ProductWithCategory = ProductRow & {
  categories: Pick<CategoryRow, "name" | "slug"> | null;
};

export type ProductSpec = {
  label: string;
  value: string;
};