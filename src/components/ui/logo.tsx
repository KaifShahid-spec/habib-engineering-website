import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className={cn(
        "text-xl font-extrabold tracking-tighter transition-colors",
        light ? "text-white" : "text-primary"
      )}>
        HABIB
      </span>
      <span className={cn(
        "text-xl font-bold tracking-tight transition-colors",
        light ? "text-slate-200" : "text-foreground"
      )}>
        ENGINEERING
      </span>
    </Link>
  );
}