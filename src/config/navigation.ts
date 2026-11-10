import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Factory,
  Building2,
  Cable,
  Sun,
  Wrench,
  ShieldCheck,
  FlaskConical,
  Hospital,
  Fuel,
  GraduationCap,
  Landmark,
  Train,
  LayoutDashboard,
  Package,
  FolderTree,
  BriefcaseBusiness,
  Users,
  FileText,
  Award,
  Inbox,
  Image as ImageIcon,
  UserCog,
  Settings,
} from "lucide-react";

// ==========================================
// Types
// ==========================================
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type MainNavItem = {
  label: string;
  href: string;
  children?: NavGroup[];
};

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: "inquiries" | "new";
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

// ==========================================
// Main Navigation (Public Website Header)
// ==========================================
export const mainNav: MainNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      {
        title: "Company",
        items: [
          { label: "Overview", href: "/about", description: "Vision, mission, and our 40-year journey", icon: Building2 },
          { label: "Group Companies", href: "/about/group-companies", description: "Our family of engineering businesses", icon: Landmark },
          { label: "Certifications", href: "/about/certifications", description: "ISO 9001, 14001, 45001 and more", icon: ShieldCheck },
          { label: "Why Choose Us", href: "/about/why-choose-us", description: "What sets Habib Engineering apart", icon: Wrench },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        title: "Transformers",
        items: [
          { label: "Distribution Transformers", href: "/products/transformers/distribution", description: "Oil-immersed & dry-type distribution", icon: Zap },
          { label: "Power Transformers", href: "/products/transformers/power", description: "Up to 40 MVA, 132 kV", icon: Factory },
          { label: "Pad-Mounted", href: "/products/transformers/pad-mounted", description: "Compact, outdoor-rated units", icon: Cable },
        ],
      },
      {
        title: "Switchgear & Panels",
        items: [
          // 🚨 Yahan links database ke slugs se match kar diye hain
          { label: "MV Switchgear", href: "/products/mv-switchgear", description: "11 kV and 33 kV panels", icon: Cable },
          { label: "LV Distribution Boards", href: "/products/lv-switchgear", description: "LT panels, MDBs, PCCs", icon: Building2 },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        title: "Engineering Services",
        items: [
          { label: "Turnkey Solutions", href: "/services/turnkey-solutions", description: "End-to-end project delivery", icon: Building2 },
          { label: "MEP", href: "/services/mep", description: "Mechanical, electrical, plumbing", icon: Wrench },
          { label: "Fire & Security", href: "/services/fire-security", description: "Fire alarm, CCTV, PA, nurse call", icon: ShieldCheck },
          { label: "Solar", href: "/services/solar", description: "On-grid & hybrid solar solutions", icon: Sun },
        ],
      },
      {
        title: "Lifecycle",
        items: [
          { label: "Testing & Commissioning", href: "/services/testing-commissioning", description: "FAT, SAT, SIT", icon: FlaskConical },
          { label: "After Sales", href: "/services/after-sales", description: "LTSA, overhaul, spares", icon: Wrench },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        title: "Sectors We Serve",
        items: [
          { label: "Oil & Gas", href: "/industries/oil-gas", icon: Fuel },
          { label: "Power", href: "/industries/power", icon: Zap },
          { label: "Healthcare", href: "/industries/healthcare", icon: Hospital },
          { label: "Infrastructure", href: "/industries/infrastructure", icon: Train },
          { label: "Industrial", href: "/industries/industrial", icon: Factory },
          { label: "Education", href: "/industries/education", icon: GraduationCap },
        ],
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ==========================================
// Admin Navigation (Admin Sidebar)
// ==========================================
export const adminNav: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Projects", href: "/admin/projects", icon: BriefcaseBusiness },
      { label: "Clients", href: "/admin/clients", icon: Users },
      { label: "Blog", href: "/admin/blog", icon: FileText },
      { label: "Certifications", href: "/admin/certifications", icon: Award },
    ],
  },
  {
    title: "Leads",
    items: [
      { label: "Inquiries", href: "/admin/inquiries", icon: Inbox, badge: "inquiries" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Media", href: "/admin/media", icon: ImageIcon },
      { label: "Users", href: "/admin/users", icon: UserCog },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];