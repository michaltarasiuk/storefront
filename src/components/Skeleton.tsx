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

interface SkeletonTextProps extends VariantProps<typeof skeletonText> {
  size?: VariantProps<typeof text>["size"];
  className?: string;
}

export function SkeletonText({size, inlineSize, className}: SkeletonTextProps) {
  return (
    <Text
      size={size}
      className={cn(
        skeletonText({
          inlineSize,
        }),
        className,
      )}>
      &#8203;{/* Zero-width space */}
      <Skeleton className={cn("absolute h-4/5 w-full")} />
    </Text>
  );
}

const skeletonText = cva("relative flex items-center", {
  variants: {
    inlineSize: {
      small: "w-20 max-w-20",
      base: "w-44 max-w-44",
      large: "w-64 max-w-64",
    },
  },
  defaultVariants: {
    inlineSize: "base",
  },
});
