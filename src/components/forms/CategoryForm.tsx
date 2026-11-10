"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "@/actions/category";
import { createClient } from "@/lib/supabase/client";

interface CategoryFormProps {
  initialData?: { 
    id: string; 
    name: string; 
    slug: string; 
    description: string | null;
    image_url?: string | null;
    is_active?: boolean;
  };
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Image upload ke liye
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  // Image state
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!initialData) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  // 🚨 Image Upload Function
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `category-${Date.now()}.${fileExt}`;
      
      // Aapke supabase mein jo bucket hai (yahan product-images use kiya hai)
      const { error: uploadError } = await supabase.storage
        .from('product-images') 
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 🚨 Yahan payload mein image_url add kar diya hai
    const payload = { 
      name, 
      slug,
      image_url: imageUrl || null, // Image URL
      is_active: initialData?.is_active ?? true 
    };
    
    let res: any; 
    
    if (initialData) {
      res = await updateCategory(initialData.id, payload);
    } else {
      res = await createCategory(payload);
    }

    setLoading(false);

    if (res.ok) { 
      router.push("/admin/categories");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-card p-6 border rounded-lg shadow-sm">
      {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
      
      <div>
        <label className="text-sm font-medium mb-1 block">Category Name</label>
        <Input value={name} onChange={handleNameChange} placeholder="e.g. Transformers" required />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Slug (URL)</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. transformers" required />
      </div>

      {/* 🚨 Image Upload Field */}
      <div>
        <label className="text-sm font-medium mb-1 block">Category Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
        {imageUrl && (
          <div className="mt-2">
             <p className="text-xs text-green-600 mb-1">Image uploaded!</p>
             <img src={imageUrl} alt="Preview" className="h-24 object-cover border rounded bg-white p-1" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || uploading} className="w-full sm:w-auto">
        {loading ? "Saving..." : initialData ? "Update Category" : "Save Category"}
      </Button>
    </form>
  );
}