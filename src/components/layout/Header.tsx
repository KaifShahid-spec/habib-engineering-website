import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* 🚨 px-0 aur pl-2 lagaya hai taake logo ek dam left (kinare) par chala jaye */}
      <div className="container mx-auto flex h-20 items-center justify-between gap-0 pl-2 pr-4 md:pl-4 md:pr-6">
        
        {/* 🚨 Logo and Text Group */}
        <Link href="/" className="flex items-center shrink-0 group">
          
          {/* Logo - Bilkul Left par, koi extra margin nahi */}
          <Logo isLink={false} className="h-14 w-14 md:h-16 md:w-16" />
          
          {/* 🚨 Text Font & Style Update Kiya Hai */}
          <span className="ml-1 font-serif text-xl md:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap">
            HABIB <span className="font-sans text-primary font-extrabold">ENGINEERING</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center px-2">
          <MegaMenu />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <Link href="/login" className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-primary transition-colors">
            <UserCircle className="size-4" /> LOGIN
          </Link>
          
          <Button asChild className="hidden sm:inline-flex rounded-full px-3 md:px-4 h-9 text-xs bg-slate-900 hover:bg-slate-800 text-white">
            <Link href="/contact/request-quote">{siteConfig.cta.primaryLabel}</Link>
          </Button>
          
          <MobileNav />
        </div>
      </div>
    </header>
  );
}