"use server";

import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export async function uploadMediaFile(formData: FormData) {
  try {
    await requireStaff();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "media";

    if (!file) throw new Error("No file provided");

    const supabase = await createServerClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { ok: true, url: publicUrl, path: data.path };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}