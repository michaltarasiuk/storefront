import {cva, type VariantProps} from "cva";

import {SpinnerIcon} from "#app/icons/SpinnerIcon";
import {cn} from "#app/utils/cn";

const spinner = cva("animate-spin", {
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

interface SpinnerProps extends VariantProps<typeof spinner> {
  className?: string;
}

export function Spinner({size, className}: SpinnerProps) {
  return (
    <SpinnerIcon
      aria-hidden
      className={cn(
        spinner({
          size,
        }),
        className,
      )}
    />
  );
}
