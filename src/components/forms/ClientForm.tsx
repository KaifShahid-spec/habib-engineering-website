"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientRecord, updateClientRecord } from "@/actions/client";
import { createClient } from "@/lib/supabase/client";

interface ClientFormProps {
  initialData?: {
    id: string;
    name: string;
    sector: string | null;
    city: string | null;
    logo_url: string | null;
  };
}

export function ClientForm({ initialData }: ClientFormProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [sector, setSector] = useState(initialData?.sector || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [logoUrl, setLogoUrl] = useState(initialData?.logo_url || "");

  // Logo Upload Handler
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('clients') // Supabase mein 'clients' naam ka public bucket hona chahiye
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('clients')
        .getPublicUrl(filePath);

      setLogoUrl(data.publicUrl);
    } catch (err: any) {
      alert("Error uploading logo: " + err.message);
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
      sector: sector || null,
      city: city || null,
      logo_url: logoUrl || null,
    };
    
    let res: any;
    if (initialData) {
      res = await updateClientRecord(initialData.id, payload);
    } else {
      res = await createClientRecord(payload);
    }

    setLoading(false);

    if (res.ok) {
      router.push("/admin/clients");
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
          <label className="text-sm font-medium mb-1 block">Client Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. MES Rawalpindi" required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Sector</label>
          <Input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. Healthcare, Defense" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">City</label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Lahore" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Client Logo (Optional)</label>
        <Input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading logo...</p>}
        {logoUrl && (
          <div className="mt-2">
            <p className="text-xs text-green-600 mb-2">Logo uploaded!</p>
            <img src={logoUrl} alt="Client Logo" className="h-16 object-contain border rounded bg-white p-2" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || uploading}>
        {loading ? "Saving..." : initialData ? "Update Client" : "Save Client"}
      </Button>
    </form>
  );
}