import { createServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Shield, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage() {
  const supabase = await createServerClient();
  
  // Fetch profiles from DB
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
          <p className="text-muted-foreground">Manage who has access to the admin panel.</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 size-4" /> Add User
          </Link>
        </Button>
      </div>

      {/* 
        Humne table ko ek alag client component mein rakha hai 
        taake role change aur delete ke liye interactivity mil sake 
      */}
      <UsersTable users={users || []} />
    </div>
  );
}