import { CertificationForm } from "@/components/forms/CertificationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCertificationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/certifications">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Certificate</h2>
          <p className="text-muted-foreground">Upload a new ISO or other certification.</p>
        </div>
      </div>

      <CertificationForm />
    </div>
  );
}