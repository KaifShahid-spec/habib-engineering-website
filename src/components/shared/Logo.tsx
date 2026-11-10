import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isLink?: boolean;
  isHero?: boolean;
}

export function Logo({ className, isLink = true, isHero = false }: LogoProps) {
  
  const imageContent = (
    <div className={cn("relative shrink-0", className)}>
      <Image 
        src="/logo.png" 
        alt="Habib Engineering Logo" 
        width={160} 
        height={160} 
        className={cn(
          "object-contain",
          // Hero mein logo bada dikhega, header mein normal
          isHero ? "h-20 w-20 md:h-28 md:w-28" : "h-12 w-12 md:h-14 md:w-14"
        )}
        priority 
      />
    </div>
  );

  if (isLink) {
    return (
      <Link href="/" className="group shrink-0">
        {imageContent}
      </Link>
    );
  }

  return imageContent;
}