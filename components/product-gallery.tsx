"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, on: true });
  };

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted"
        onMouseMove={handleMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 600px"
          className={cn(
            "object-cover transition-transform duration-200",
            zoom.on && "scale-150"
          )}
          style={
            zoom.on
              ? { transformOrigin: `${zoom.x}% ${zoom.y}%` }
              : undefined
          }
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 bg-muted transition-colors",
              active === i ? "border-primary" : "border-transparent hover:border-border"
            )}
            aria-label={`${alt} ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
