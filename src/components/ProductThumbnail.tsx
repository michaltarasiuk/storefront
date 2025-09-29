"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {cva, type VariantProps} from "class-variance-authority";
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

const productThumbnail = cva(
  "rounded-base border-base-border bg-base-background relative flex items-center justify-center overflow-hidden border",
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
  }
  return (
    <div
      className={cn(
        productThumbnail({
          size,
        }),
      )}>
      {isDefined(data.thumbnail) && !error ? (
        <Image
          src={data.thumbnail.url}
          alt={data.thumbnail.alt ?? ""}
          fill
          onError={() => setError(true)}
        />
      ) : (
        <PlaceholderImageIcon aria-hidden />
      )}
    </div>
  );
}

const skeletonProductThumbnail = cva(null, {
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

type SkeletonProductThumbnailProps = VariantProps<
  typeof skeletonProductThumbnail
>;

export function SkeletonProductThumbnail(props: SkeletonProductThumbnailProps) {
  return <Skeleton className={cn(skeletonProductThumbnail(props))} />;
}
