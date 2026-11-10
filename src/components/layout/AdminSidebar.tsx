"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNav } from "@/config/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import Image from "next/image"; // 🚨 Image import karein

interface AdminSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isMobile, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    const fetchUnread = async () => {
      const { count } = await supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new");
      if (count !== null && isMounted) setUnreadCount(count);
    };
    fetchUnread();
    const channelId = `sidebar-inquiries-${Math.random().toString(36).substring(7)}`;
    const channel = supabase.channel(channelId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_submissions" }, () => {
        if (isMounted) fetchUnread();
      }).subscribe();
    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <aside className={cn(
      "flex-col border-r bg-slate-50 flex h-screen overflow-y-auto",
      isMobile ? "w-full" : "w-64 sticky top-0 hidden md:flex"
    )}>
      
      {/* 🚨 Yahan Logo aur Text dono hain */}
      <div className="flex h-16 md:h-20 items-center justify-between border-b px-4 bg-white shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Habib Engineering" 
            width={40} 
            height={40} 
            sizes="40px"
            className="object-contain"
          />
          <span className="text-sm font-black tracking-tighter text-slate-900 leading-tight">
            HABIB <span className="text-primary">ENGINEERING</span>
          </span>
        </Link>
        
        {isMobile && (
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <X className="size-5" />
          </button>
        )}
      </div>

      <div className="flex-1 py-6">
        <nav className="grid items-start px-4 text-sm font-medium gap-1">
          {adminNav.map((group) => (
            <div key={group.title} className="mb-6">
              <h4 className="mb-2 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                {group.title}
              </h4>
              <div className="grid gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  const showBadge = item.label === "Inquiries" && unreadCount > 0;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                      {showBadge && (
                        <span className={cn(
                          "ml-auto flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full text-[10px] font-bold",
                          isActive ? "bg-white text-primary" : "bg-red-500 text-white"
                        )}>
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}