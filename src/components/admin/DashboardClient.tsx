"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { dashboardStats, quickActions } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DashboardClient() {
  const supabase = createClient();
  const [counts, setCounts] = useState({
    products: 0,
    projects: 0,
    clients: 0,
    blog: 0,
    certifications: 0,
    inquiries: 0,
  });

  const fetchCounts = async () => {
    const [
      { count: productsCount },
      { count: projectsCount },
      { count: clientsCount },
      { count: blogCount },
      { count: certificationsCount },
      { count: inquiriesCount },
    ] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("certifications").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    ]);

    setCounts({
      products: productsCount || 0,
      projects: projectsCount || 0,
      clients: clientsCount || 0,
      blog: blogCount || 0,
      certifications: certificationsCount || 0,
      inquiries: inquiriesCount || 0,
    });
  };

  useEffect(() => {
    fetchCounts();

    const channel = supabase
      .channel("dashboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        fetchCounts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const realStats = [
    { ...dashboardStats[0], value: counts.products },
    { ...dashboardStats[1], value: counts.projects },
    { ...dashboardStats[2], value: counts.clients },
    { ...dashboardStats[3], value: counts.blog },
    { ...dashboardStats[4], value: counts.certifications },
    { ...dashboardStats[5], value: counts.inquiries },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your website.</p>
        </div>
      </div>

      {/* 🚨 Responsive Grid: Mobile (1), Tablet (2), Desktop (3) */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {realStats.map((stat) => (
          <StatsCard
            key={stat.key}
            title={stat.label}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconClassName={
              stat.label === "New Inquiries" && stat.value > 0 
              ? "bg-red-100 text-red-600" 
              : "bg-primary/10 text-primary"
            }
          />
        ))}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
        {/* 🚨 Buttons full width on mobile */}
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.href} asChild variant="outline" className="hover:bg-primary hover:text-white transition-colors w-full sm:w-auto">
              <Link href={action.href}>
                <Plus className="mr-2 size-4" /> {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}