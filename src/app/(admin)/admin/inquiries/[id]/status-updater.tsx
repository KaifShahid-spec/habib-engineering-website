"use client";

import { useState } from "react";
import { updateInquiryStatus } from "@/actions/inquiry";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function InquiryStatusUpdater({ 
  id, 
  currentStatus, 
  tableName 
}: { 
  id: string, 
  currentStatus: string,
  tableName: "contact_submissions" | "quote_requests"
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  // 👇 Yahan humne newStatus ko string | null kiya hai
  const handleUpdate = async (newStatus: string | null) => {
    if (!newStatus) return; // Agar null ho toh kuch na karein

    setIsUpdating(true);
    const res = await updateInquiryStatus(id, tableName, newStatus);
    if (res.ok) {
      setStatus(newStatus);
      toast.success("Status updated");
    } else {
      toast.error(res.error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Status</h3>
      <div className="flex items-center gap-3">
        <Select value={status} onValueChange={handleUpdate} disabled={isUpdating}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INQUIRY_STATUSES.map(s => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isUpdating && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
      </div>
    </div>
  );
}