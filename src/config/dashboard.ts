/**
 * Admin dashboard configuration.
 * Used by `/admin/dashboard` page and stats cards.
 */
import type { LucideIcon } from "lucide-react";
import {
  Package,
  BriefcaseBusiness,
  Users,
  FileText,
  Inbox,
  Award,
} from "lucide-react";

export type DashboardStatKey =
  | "products"
  | "projects"
  | "clients"
  | "blog_posts"
  | "certifications"
  | "new_inquiries";

export type DashboardStat = {
  key: DashboardStatKey;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Accent color token from tailwind (e.g. "text-blue-600") */
  accent: string;
};

export const dashboardStats: DashboardStat[] = [
  {
    key: "products",
    label: "Products",
    description: "Total products across all categories",
    href: "/admin/products",
    icon: Package,
    accent: "text-blue-600",
  },
  {
    key: "projects",
    label: "Projects",
    description: "Delivered and ongoing projects",
    href: "/admin/projects",
    icon: BriefcaseBusiness,
    accent: "text-amber-600",
  },
  {
    key: "clients",
    label: "Clients",
    description: "Client organisations on record",
    href: "/admin/clients",
    icon: Users,
    accent: "text-emerald-600",
  },
  {
    key: "blog_posts",
    label: "Blog Posts",
    description: "Published and draft articles",
    href: "/admin/blog",
    icon: FileText,
    accent: "text-purple-600",
  },
  {
    key: "certifications",
    label: "Certifications",
    description: "Active certifications on file",
    href: "/admin/certifications",
    icon: Award,
    accent: "text-rose-600",
  },
  {
    key: "new_inquiries",
    label: "New Inquiries",
    description: "Contact form submissions (unread)",
    href: "/admin/inquiries",
    icon: Inbox,
    accent: "text-orange-600",
  },
];

/** Recent-activity widget config */
export const recentActivityConfig = {
  limit: 8,
  types: ["inquiry", "product", "project", "blog"] as const,
};

export type RecentActivityType = (typeof recentActivityConfig.types)[number];

/** Quick actions shown at the top of the dashboard */
export const quickActions = [
  { label: "Add Product", href: "/admin/products/new" },
  { label: "Add Project", href: "/admin/projects/new" },
  { label: "Write Blog Post", href: "/admin/blog/new" },
  { label: "View Inquiries", href: "/admin/inquiries" },
] as const;