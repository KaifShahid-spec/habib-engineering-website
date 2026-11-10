"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCertification, updateCertification } from "@/actions/certification";
import { createClient } from "@/lib/supabase/client"; // Browser client

interface CertificationFormProps {
  initialData?: {
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    expiry_date: string | null;
    certificate_image_url: string | null;
    is_active: boolean;
  };
}

export function CertificationForm({ initialData }: CertificationFormProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [issuer, setIssuer] = useState(initialData?.issuer || "");
  const [issueDate, setIssueDate] = useState(initialData?.issue_date || "");
  const [expiryDate, setExpiryDate] = useState(initialData?.expiry_date || "");
  const [imageUrl, setImageUrl] = useState(initialData?.certificate_image_url || "");

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Supabase Storage mein upload
      const { error: uploadError } = await supabase.storage
        .from('certifications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Public URL nikalna
      const { data } = supabase.storage
        .from('certifications')
        .getPublicUrl(filePath);

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
      issuer,
      issue_date: issueDate,
      expiry_date: expiryDate || null,
      certificate_image_url: imageUrl || null,
      is_active: initialData?.is_active ?? true,
    };
    
    let res: any;
    if (initialData) {
      res = await updateCertification(initialData.id, payload);
    } else {
      res = await createCertification(payload);
    }

    setLoading(false);

    if (res.ok) {
      router.push("/admin/certifications");
      router.refresh();
    } else {
      setError(res.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-card p-6 border rounded-lg shadow-sm">
      {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Certificate Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. ISO 9001:2015" required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Issuing Authority</label>
          <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="e.g. Ethical Certifications" required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Issue Date</label>
          <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Expiry Date (Optional)</label>
          <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Certificate Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading image...</p>}
        {imageUrl && (
          <div className="mt-2">
            <p className="text-xs text-green-600 mb-2">Image uploaded successfully!</p>
            <img src={imageUrl} alt="Certificate" className="h-32 object-contain border rounded" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || uploading}>
        {loading ? "Saving..." : initialData ? "Update Certificate" : "Save Certificate"}
      </Button>
    </form>
  );
}