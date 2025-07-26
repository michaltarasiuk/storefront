import {cva, type VariantProps} from "class-variance-authority";

import {SpinnerIcon} from "@/icons/SpinnerIcon";
import {cn} from "@/utils/cn";

const spinner = cva("animate-spin [animation-duration:0.5s]", {
  variants: {
    size: {
      extraSmall: "size-2.5",
      small: "size-3.5",
      base: "size-4.5",
      large: "size-7.5",
      fill: "size-full",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

export function Spinner({size}: VariantProps<typeof spinner>) {
  return (
    <SpinnerIcon
      aria-hidden
      className={cn(
        spinner({
          size,
        }),
      )}
    />
  );
}
