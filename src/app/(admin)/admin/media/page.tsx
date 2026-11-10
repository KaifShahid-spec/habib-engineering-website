"use client"; // ✅ Client component banayein

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loadFiles = async () => {
    const { data } = await supabase.storage.from("media").list();
    setFiles(data || []);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Media Library</h2>
      <Card>
        <CardHeader><CardTitle>Upload Image</CardTitle></CardHeader>
        <CardContent>
          <ImageUploader bucket="media" onUploadSuccess={loadFiles} />
        </CardContent>
      </Card>
      {/* Image grid... */}
    </div>
  );
}