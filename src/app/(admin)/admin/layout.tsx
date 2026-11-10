import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { MobileAdminNav } from "@/components/layout/MobileAdminNav";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Notifications } from "@/components/admin/Notifications";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      
      {/* 🚨 Yahan direct AdminSidebar hai. Iska 'hidden md:flex' code ke andar handle ho raha hai */}
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-4">
            
            {/* Mobile Menu Button */}
            <MobileAdminNav />
            
            <h1 className="text-lg font-semibold hidden sm:block">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Notifications />
            
            <div className="h-6 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <form action={async () => {
                "use server";
                const sb = await createServerClient();
                await sb.auth.signOut();
                redirect("/login");
              }}>
                <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}