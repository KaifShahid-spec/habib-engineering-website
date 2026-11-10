"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUser } from "@/actions/user";
import { Card, CardContent } from "@/components/ui/card";

export function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ full_name: "", email: "", role: "staff" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    const res = await createUser({
      ...formData,
      role: formData.role as "admin" | "staff" | "viewer",
      password: "HabibTempPassword2024!",
    });
    if (res.ok) {
      toast.success("User created successfully!");
      toast.info("Temporary Password: HabibTempPassword2024!", { duration: 8000 });
      router.push("/admin/users");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to create user");
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input placeholder="e.g. Ahmed Khan" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Email Address *</Label>
            <Input type="email" placeholder="ahmed@habibengineering.com.pk" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Role *</Label>
            <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val as string })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="staff">Staff (Editor)</SelectItem>
                <SelectItem value="viewer">Viewer (Read-only)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/users")} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 size-4 animate-spin" /> Creating...</> : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}