"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";

// Hum form mein simple object use karenge, aur submit karte waqt array banayenge
interface SettingsFormProps {
  initialSettings: Record<string, string>;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Default values agar database khali ho
  const [formData, setFormData] = useState({
    company_phone_1: initialSettings["company_phone_1"] || "",
    company_phone_2: initialSettings["company_phone_2"] || "",
    company_email: initialSettings["company_email"] || "",
    head_office_address: initialSettings["head_office_address"] || "",
    factory_address: initialSettings["factory_address"] || "",
    facebook_url: initialSettings["facebook_url"] || "",
    linkedin_url: initialSettings["linkedin_url"] || "",
    instagram_url: initialSettings["instagram_url"] || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Object ko Key-Value Array mein convert karein
    const payloadArray = Object.entries(formData).map(([key, value]) => ({
      key,
      value: String(value),
    }));

    const res: any = await updateSettings(payloadArray);
    
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      router.refresh(); // Navbar/Footer ko update karne ke liye
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(res.error || "Failed to save settings");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-card p-6 border rounded-lg shadow-sm">
      {error && <div className="text-red-500 bg-red-50 p-3 rounded text-sm">{error}</div>}
      {success && <div className="text-green-600 bg-green-50 p-3 rounded text-sm font-medium">Settings saved successfully!</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="font-semibold border-b pb-2 text-lg">Contact Information</h3>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Primary Phone</label>
            <Input name="company_phone_1" value={formData.company_phone_1} onChange={handleChange} placeholder="e.g. 0326 844 2292" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Secondary Phone</label>
            <Input name="company_phone_2" value={formData.company_phone_2} onChange={handleChange} placeholder="e.g. +92 300 44 12 321" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Email Address</label>
            <Input name="company_email" value={formData.company_email} onChange={handleChange} placeholder="e.g. info@habibengineering.com" />
          </div>
        </div>

        {/* Locations Section */}
        <div className="space-y-4">
          <h3 className="font-semibold border-b pb-2 text-lg">Locations</h3>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Head Office Address</label>
            <Input name="head_office_address" value={formData.head_office_address} onChange={handleChange} placeholder="e.g. DHA Phase 8, Lahore" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Factory Address</label>
            <Input name="factory_address" value={formData.factory_address} onChange={handleChange} placeholder="e.g. Plot No. 217, College Road..." />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="font-semibold border-b pb-2 text-lg">Social Media Links</h3>
          
          {/* Yahan 3 columns kar diye hain taake teeno barabar aayein */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Facebook URL</label>
              <Input name="facebook_url" value={formData.facebook_url} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">LinkedIn URL</label>
              <Input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Instagram URL</label>
              <Input name="instagram_url" value={formData.instagram_url} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}