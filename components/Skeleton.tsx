import {cva, VariantProps} from "class-variance-authority";

import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {Text} from "./Text";

export function Skeleton(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-base bg-base-border animate-pulse",
        props.className,
      )}
    />
  );
}

interface SkeletonTextProps
  extends VariantProps<typeof skeletonText>,
    Pick<VariantProps<typeof text>, "size"> {
  className?: string;
}

export function SkeletonText({inlineSize, size, className}: SkeletonTextProps) {
  return (
    <Text
      aria-hidden
      size={size}
      className={cn("relative flex items-center select-none", className)}>
      {"\u200B" /* Zero-width space */}
      <Skeleton
        className={cn(
          skeletonText({
            inlineSize,
          }),
        )}
      />
    </Text>
  );
}

const skeletonText = cva("absolute h-4/5 w-full", {
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
