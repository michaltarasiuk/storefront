"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {cva, type VariantProps} from "cva";
import Image from "next/image";
import {useState} from "react";

import {graphql} from "@/graphql/codegen";
import type {ProductThumbnail_ProductFragment} from "@/graphql/codegen/graphql";

import {PlaceholderImageIcon} from "../icons/PlaceholderImageIcon";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {Skeleton} from "./Skeleton";

const ProductThumbnail_ProductFragment = graphql(`
  fragment ProductThumbnail_Product on Product {
    id
    thumbnail {
      url
      alt
    }
  }
`);

interface ProductThumbnailProps extends ThumbnailVariants {
  product: FragmentType<ProductThumbnail_ProductFragment>;
}

export function ProductThumbnail({product, size}: ProductThumbnailProps) {
  const {data, complete} = useFragment({
    fragment: ProductThumbnail_ProductFragment,
    from: product,
  });
  const [error, setError] = useState(false);
  if (!complete) {
    return <SkeletonProductThumbnail size={size} />;
  } else if (!isDefined(data.thumbnail) || error) {
    return <PlaceholderProductThumbnail size={size} />;
  }
  return (
    <div
      className={cn(
        "rounded-base border-base-border bg-base-background relative flex items-center justify-center overflow-hidden border",
        thumbnail({
          size,
        }),
      )}>
      <Image
        src={data.thumbnail.url}
        alt={data.thumbnail.alt ?? ""}
        fill
        onError={() => setError(true)}
      />
    </div>
  );
}

export function PlaceholderProductThumbnail(props: ThumbnailVariants) {
  return (
    <div
      className={cn(
        "rounded-base border-base-border bg-base-background flex items-center justify-center border",
        thumbnail(props),
      )}>
      <PlaceholderImageIcon aria-hidden />
    </div>
  );
}

export function SkeletonProductThumbnail(props: ThumbnailVariants) {
  return <Skeleton className={cn(thumbnail(props))} />;
}

const thumbnail = cva(null, {
  variants: {
    size: {
      small: "size-10",
      base: "size-16",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type ThumbnailVariants = VariantProps<typeof thumbnail>;
