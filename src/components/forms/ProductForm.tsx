"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/actions/product";
import { createClient } from "@/lib/supabase/client";

interface ProductFormProps {
  initialData?: any;
  categories: { id: string; name: string }[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [description, setDescription] = useState(initialData?.description || "");
  
  // Aapke database mein column ka naam image_url hai
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

  // Image Upload Function (Product Bucket)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `product-${Date.now()}.${fileExt}`;
      
      // 🚨 Yahan aapka bucket 'product-images' use ho raha hai
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

    const payload = {
      name, 
      slug, 
      category_id: categoryId, 
      description, 
      image_url: imageUrl || null,
    };
    
    let res: any;
    if (initialData) {
      res = await updateProduct(initialData.id, payload);
    } else {
      res = await createProduct(payload);
    }

    setLoading(false);
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-card p-6 border rounded-lg shadow-sm">
      {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
      
      <div>
        <label className="text-sm font-medium mb-1 block">Product Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Slug (URL)</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Category</label>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)} 
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea 
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Product Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
        {imageUrl && (
          <div className="mt-2">
             <p className="text-xs text-green-600 mb-1">Image uploaded!</p>
             <img src={imageUrl} alt="Preview" className="h-32 object-contain border rounded p-1 bg-white" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || uploading}>
        {loading ? "Saving..." : initialData ? "Update Product" : "Save Product"}
      </Button>
    </form>
  );
}