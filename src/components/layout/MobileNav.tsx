"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, UserCircle, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <button 
          type="button" 
          className="inline-flex items-center justify-center rounded-md transition-colors hover:bg-slate-100 h-10 w-10 lg:hidden"
        >
          <Menu className="size-6 text-slate-900" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent 
        side="right" 
        showCloseButton={false} 
        className="w-full max-w-[320px] sm:max-w-sm flex flex-col p-0 border-l shadow-2xl h-full bg-white"
      >
        
        {/* Header Area */}
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between shrink-0">
          
          {/* 🚨 Logo and Text aligned */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image 
              src="/logo.png" 
              alt="Habib Engineering" 
              width={80}
              height={80}
              className="object-contain h-10 w-10 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-black tracking-tighter text-slate-900 leading-none">
                HABIB ENGINEERING
              </span>
              <span className="text-xs font-black tracking-tighter text-primary leading-none mt-0.5">
                ENGINEERING
              </span>
            </div>
          </Link>

          {/* SheetTitle hidden for accessibility */}
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          
          <button 
            type="button" 
            onClick={() => setOpen(false)} 
            className="text-slate-500 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-200 transition-colors shrink-0"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Links Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="flex flex-col space-y-4">
            {mainNav.map((item) => (
              <div key={item.href} className="space-y-1">
                <Link 
                  href={item.href} 
                  onClick={() => setOpen(false)} 
                  className="flex items-center justify-between py-1 text-base font-bold text-slate-900 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                
                {item.children && (
                  <div className="ml-2 border-l-2 border-slate-100 pl-3 space-y-1 pb-1">
                    {item.children.map((group, idx) => (
                      <div key={idx} className="pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                          {group.title}
                        </span>
                        {group.items.map((child) => (
                          <Link 
                            key={child.href} 
                            href={child.href} 
                            onClick={() => setOpen(false)} 
                            className="block py-1.5 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t bg-slate-50 space-y-3 shrink-0">
          <Link 
            href="/contact/request-quote" 
            onClick={() => setOpen(false)} 
            className="flex items-center justify-center w-full rounded-full h-11 bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            {siteConfig.cta.primaryLabel}
          </Link>
          
          <Link 
            href="/login" 
            onClick={() => setOpen(false)} 
            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors py-1"
          >
            <UserCircle className="size-4" /> LOGIN
          </Link>
        </div>
        
      </SheetContent>
    </Sheet>
  );
}