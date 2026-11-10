"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { loginSchema, type LoginValues } from "@/lib/validators/contact";

export type AuthResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function signIn(
  raw: unknown
): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid credentials.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: LoginValues = parsed.data;
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // Do not leak whether email exists
    return { ok: false, error: "Invalid email or password." };
  }

  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * Server-side helper to fetch current user (for guarded pages).
 * Returns null if not signed in.
 */
export async function getCurrentUser() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/**
 * Requires a signed-in user — redirects to /login otherwise.
 * Call from admin pages / admin server actions.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * Requires a staff or admin role. Throws if not.
 * Used inside admin server actions (edit/create/delete).
 */
export async function requireStaff() {
  const user = await requireUser();
  const supabase = await createServerClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error("Profile not found for signed-in user.");
  }
  if (profile.role !== "admin" && profile.role !== "staff") {
    throw new Error("Forbidden: staff access required.");
  }
  return { user, role: profile.role as "admin" | "staff" };
}