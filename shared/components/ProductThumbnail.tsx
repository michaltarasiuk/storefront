"use client";

import {cva, VariantProps} from "class-variance-authority";
import Image from "next/image";
import {useState} from "react";

import {PlaceholderImageIcon} from "../icons/PlaceholderImageIcon";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {Badge} from "./Badge";

const productThumbnail = cva(
  "rounded-base border-base-border bg-base-background-subdued relative flex items-center justify-center border",
  {
    variants: {
      size: {
        small: "size-10",
        base: "size-16",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

interface ProductThumbnailProps extends VariantProps<typeof productThumbnail> {
  src?: string;
  alt?: string;
  badge: number;
}

export function ProductThumbnail({
  src,
  alt = "",
  badge,
  size,
}: ProductThumbnailProps) {
  const [error, setError] = useState(false);
  return (
    <div className={cn(productThumbnail({size}))}>
      {isDefined(src) && !error ? (
        <Image src={src} alt={alt} fill onError={() => setError(true)} />
      ) : (
        <PlaceholderImageIcon aria-hidden />
      )}
      <div
        className={cn(
          "absolute top-0 right-0",
          "translate-x-1/2 -translate-y-1/2",
        )}>
        <Badge size={size}>{badge}</Badge>
      </div>
    </div>
  );
}
