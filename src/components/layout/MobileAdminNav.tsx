"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";

export function MobileAdminNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* 🚨 z-50 lagaya hai taake button hamesha clickable rahe */}
        <Button variant="outline" size="icon" className="md:hidden shrink-0 relative z-50">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      
      {/* 🚨 z-[100] lagaya hai taake menu header ke upar khule */}
      <SheetContent 
        side="left" 
        showCloseButton={false}
        className="w-[280px] sm:w-[320px] p-0 flex flex-col border-r shadow-2xl z-[100] bg-slate-50" 
      >
        <SheetTitle className="sr-only">Admin Menu</SheetTitle>
        
        {/* 🚨 Yahan direct AdminSidebar render kar rahe hain */}
        <div className="h-full overflow-y-auto">
          <AdminSidebar isMobile={true} onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}