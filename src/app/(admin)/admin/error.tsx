"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ADMIN ERROR:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Admin Page Error</h2>
      <p className="text-muted-foreground mb-4">Asli error yeh hai (screenshot bhejein):</p>
      <pre className="bg-red-50 text-red-900 p-4 rounded-md text-sm overflow-auto max-w-2xl w-full text-left border border-red-200">
        {error.message}
      </pre>
      <Button onClick={() => reset()} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}