"use client";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestInquiries, setLatestInquiries] = useState<any[]>([]);
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Data fetch karne ka function
  const fetchNotifications = async () => {
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    if (count) setUnreadCount(count);

    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("status", "new")
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) setLatestInquiries(data);
  };

  useEffect(() => {
    fetchNotifications();

    // Real-time listener
    const channel = supabase
      .channel("schema-db-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_submissions" }, () => {
        fetchNotifications();
      })
      .subscribe();

    // Bahar click karne par dropdown band karne ka logic
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border bg-popover text-popover-foreground shadow-md z-50 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b bg-muted/50 font-semibold text-sm">
            <span>Notifications</span>
            {unreadCount > 0 && <span className="text-xs text-red-500 font-normal">{unreadCount} New</span>}
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {latestInquiries.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            ) : (
              latestInquiries.map((inquiry) => (
                <Link 
                  key={inquiry.id} 
                  href={`/admin/inquiries/${inquiry.id}`} 
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-start gap-1 p-3 hover:bg-accent border-b last:border-0 transition-colors"
                >
                  <span className="font-medium text-sm">{inquiry.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{inquiry.subject || inquiry.message}</span>
                </Link>
              ))
            )}
          </div>
          
          <Link 
            href="/admin/inquiries" 
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-2 text-sm text-blue-600 font-medium hover:bg-accent border-t transition-colors"
          >
            View All Inquiries
          </Link>
        </div>
      )}
    </div>
  );
}