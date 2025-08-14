import {cva, type VariantProps} from "class-variance-authority";

import type {text} from "../styles/text";
import {cn} from "../utils/cn";
import {Skeleton} from "./Skeleton";
import {Text} from "./Text";

const skeletonText = cva("relative flex w-full items-center", {
  variants: {
    inlineSize: {
      small: "max-w-20",
      base: "max-w-44",
      large: "max-w-64",
    },
  },
  defaultVariants: {
    inlineSize: "base",
  },
});

interface SkeletonTextProps
  extends Pick<VariantProps<typeof text>, "size">,
    VariantProps<typeof skeletonText> {
  className?: string;
}

export function SkeletonText({inlineSize, ...props}: SkeletonTextProps) {
  return (
    <Text
      {...props}
      className={cn(
        skeletonText({
          inlineSize,
        }),
        props.className,
      )}>
      &#8203;
      <Skeleton className={cn("absolute h-4/5 w-full")} />
    </Text>
  );
}
