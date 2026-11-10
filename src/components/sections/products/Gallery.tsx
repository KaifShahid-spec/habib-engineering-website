"use client";

import { useState } from "react";
import { LazyImage } from "@/components/shared/LazyImage";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images, alt }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square sm:aspect-video md:aspect-square w-full rounded-xl overflow-hidden border bg-muted">
        <LazyImage
          src={images[activeIndex]}
          alt={`${alt} - Image ${activeIndex + 1}`}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-md border-2 snap-start bg-muted transition-all",
                activeIndex === idx ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <LazyImage
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}