"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProject, updateProject } from "@/actions/project";
import { createClient } from "@/lib/supabase/client";
import { X, Upload } from "lucide-react";

interface ProjectFormProps {
  initialData?: any;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Basic States
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [clientName, setClientName] = useState(initialData?.client_name || "");
  const [sector, setSector] = useState(initialData?.sector || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [city, setCity] = useState(initialData?.city || "");
  
  // Details States
  const [scope, setScope] = useState(initialData?.scope || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [completionYear, setCompletionYear] = useState(initialData?.completion_year || "");
  
  // Settings States
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order || 0);

  // Image State
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `project-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
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
      title,
      slug,
      client_name: clientName || null,
      sector: sector || null,
      location: location || null,
      city: city || null,
      scope: scope || null,
      description: description || null,
      completion_year: completionYear ? parseInt(completionYear as string) : null,
      image_url: imageUrl || null,
      is_featured: isFeatured,
      is_active: isActive,
      sort_order: parseInt(sortOrder as string) || 0,
    };
    
    let res: any;
    if (initialData) {
      res = await updateProject(initialData.id, payload);
    } else {
      res = await createProject(payload);
    }

    setLoading(false);
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-card p-6 border rounded-lg shadow-sm">
      {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
      
      {/* 1. Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Project Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Slug (URL)</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Client Name</label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Sector</label>
            <Input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. Healthcare" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">City</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Rawalpindi" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Location (Address)</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. MES Rawalpindi" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Completion Year</label>
            <Input type="number" value={completionYear} onChange={(e) => setCompletionYear(e.target.value)} placeholder="e.g. 2023" />
          </div>
        </div>
      </div>

      {/* 2. Details */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold border-b pb-2">Project Details</h3>
        <div>
          <label className="text-sm font-medium mb-1 block">Scope of Work</label>
          <Input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="e.g. Supply and installation of MV switchgear..." />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description / Case Study</label>
          <textarea 
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Write detailed case study here..."
          />
        </div>
      </div>

      {/* 3. Settings */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold border-b pb-2">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">Featured Project</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active / Visible</label>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Sort Order</label>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </div>
        </div>
      </div>

      {/* 4. Image */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Project Image</h3>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
        {imageUrl && (
          <div className="mt-2 relative inline-block">
             <img src={imageUrl} alt="Preview" className="h-32 object-cover border rounded" />
             <button 
               type="button" 
               onClick={() => setImageUrl("")}
               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
             >
               <X className="size-3" />
             </button>
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || uploading} className="w-full md:w-auto">
        {loading ? "Saving..." : initialData ? "Update Project" : "Save Project"}
      </Button>
    </form>
  );
}