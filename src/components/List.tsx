import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "../utils/cn";

const list = cva("flex flex-col", {
  variants: {
    spacing: {
      none: null,
      extraTight: "gap-small-400",
      tight: "gap-small-100",
      base: "gap-base",
      loose: "gap-large-200",
      extraLoose: "gap-large-500",
    },
  },
  defaultVariants: {
    spacing: "base",
  },
});

interface ListProps extends VariantProps<typeof list> {
  children: React.ReactNode;
  className?: string;
}

export function List({children, spacing, className}: ListProps) {
  return (
    <ul
      className={cn(
        list({
          spacing,
        }),
        className,
      )}>
      {children}
    </ul>
  );
}

export function ListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={cn("flex justify-stretch", className)}>{children}</li>;
}
