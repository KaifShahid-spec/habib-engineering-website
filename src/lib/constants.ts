/**
 * Global application constants.
 * Hardcoded lists, limits, and options.
 */

// Admin panel list views mein ek page par kitne items dikhein
export const ADMIN_PAGE_SIZE = 20;

// Public website par listing pages (projects, blog) par kitne items dikhein
export const PUBLIC_PAGE_SIZE = 12;

// Form inputs ke limits (taake koi bohot lamba text na bheje)
export const MAX_MESSAGE_LENGTH = 5000;
export const MAX_BIO_LENGTH = 500;
export const MAX_TITLE_LENGTH = 150;

// Contact & Quote form dropdowns
export const PROJECT_TYPES = [
  "New Installation",
  "Upgradation / Replacement",
  "Maintenance & Repair",
  "Testing & Commissioning",
  "Turnkey Solution",
  "Other",
] as const;

export const PROJECT_TIMELINES = [
  "Urgent (Within 1 month)",
  "1 - 3 months",
  "3 - 6 months",
  "6+ months",
  "Not decided yet",
] as const;

export const INQUIRY_STATUSES = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "read", label: "Read", color: "bg-slate-500" },
  { value: "contacted", label: "Contacted", color: "bg-amber-500" },
  { value: "closed", label: "Closed / Won", color: "bg-emerald-500" },
] as const;

export const USER_ROLES = [
  { value: "admin", label: "Administrator" },
  { value: "staff", label: "Staff (Editor)" },
  { value: "viewer", label: "Viewer (Read-only)" },
] as const;

// File upload limits
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];