"use client";

import React from "react";
import { Star } from "lucide-react";

interface MarqueeProps {
  items: string[];
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function Marquee({
  items,
  bgColor = "bg-primary",
  textColor = "text-vibrant-yellow",
  borderColor = "border-electric-blue",
}: MarqueeProps) {
  // Double the items array to ensure seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`${bgColor} ${textColor} py-4 border-y-4 ${borderColor} overflow-hidden relative z-20`}>
      <div className="flex whitespace-nowrap animate-marquee font-headline-md text-headline-md tracking-wider">
        {repeatedItems.map((item, index) => (
          <span key={index} className="flex items-center mx-8 uppercase">
            {item}
            <Star className="w-6 h-6 ml-16 fill-current opacity-80" />
          </span>
        ))}
      </div>
    </div>
  );
}
