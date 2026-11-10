"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadMediaFile } from "@/actions/media";
import { toast } from "sonner";

interface ImageUploaderProps {
  bucket?: string;
  onUploadSuccess: (url: string) => void;
  defaultImage?: string;
}

export function ImageUploader({
  bucket = "media",
  onUploadSuccess,
  defaultImage,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);

    try {
      const res = await uploadMediaFile(formData);
      if (!res.ok) throw new Error(res.error);

      // ✅ Type fix: 'res.url' ko string assert kiya
      const url = res.url as string; 
      setPreview(url);
      onUploadSuccess(url);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onUploadSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border aspect-video w-full max-w-sm">
          <img src={preview} alt="Upload preview" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button type="button" variant="destructive" size="sm" onClick={clearImage}>
              <X className="size-4 mr-2" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors aspect-video w-full max-w-sm"
        >
          {isUploading ? (
            <Loader2 className="size-8 text-muted-foreground animate-spin" />
          ) : (
            <>
              <UploadCloud className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or WEBP (max. 5MB)</p>
            </>
          )}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}