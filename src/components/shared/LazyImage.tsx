"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

export function LazyImage({ src, alt, className, fallbackClassName, ...props }: LazyImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className,
          fallbackClassName
        )}
      >
        <ImageIcon className="size-8 opacity-20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
      {...props}
    />
  );
}