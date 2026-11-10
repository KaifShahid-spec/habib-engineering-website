import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/components/forms/LoginForm"; // Aapka form component

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* 🚨 Logo Yahan Add Kiya Hai */}
        <div className="flex justify-center mb-4">
          <Logo isLink={false} className="scale-125" /> 
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your website</p>
        </div>

        {/* Aapka Login Form */}
        <LoginForm /> 
      </div>
    </div>
  );
}