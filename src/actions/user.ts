"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "./auth";

export type UserInput = {
  email: string;
  password?: string;
  full_name: string;
  role: "admin" | "staff" | "viewer";
};

// 1. Nayi team member add karna (Invite / Create)
export async function createUser(data: UserInput) {
  try {
    // Ensure karne ke liye ke sirf Admin hi naya user bana sakta hai
    const { role: currentUserRole } = await requireStaff();
    if (currentUserRole !== "admin") {
      throw new Error("Only administrators can create users.");
    }

    // Admin client use karein kyunke humein auth bypass karni hai
    const supabaseAdmin = createAdminClient();

    // Supabase Auth mein user banayein
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password || "TempPassword123!", 
      email_confirm: true,
    });

    if (authError || !authUser.user) throw authError || new Error("Auth user creation failed");

    // Profile table mein entry banayein
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: authUser.user.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
    });

    if (profileError) {
      // Agar profile fail hui, toh auth user bhi delete karein (rollback)
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      throw profileError;
    }

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// 2. User ka role change karna
export async function updateUserRole(userId: string, newRole: "admin" | "staff" | "viewer") {
  try {
    const { role: currentUserRole } = await requireStaff();
    if (currentUserRole !== "admin") {
      throw new Error("Only administrators can update roles.");
    }

    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) throw error;

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// 3. User ko delete karna
export async function deleteUser(userId: string) {
  try {
    const { user: currentUser, role: currentUserRole } = await requireStaff();
    
    if (currentUserRole !== "admin") throw new Error("Only admins can delete users.");
    if (currentUser.id === userId) throw new Error("You cannot delete your own account.");

    const supabaseAdmin = createAdminClient();
    
    // Auth se delete karein (cascade profile bhi delete kar dega)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}