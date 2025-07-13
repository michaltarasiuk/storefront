import {cva, type VariantProps} from "class-variance-authority";

import {ProfileIcon} from "../icons/ProfileIcon";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

const avatar = cva(
  "bg-base-background-subdued rounded-fully font-primary text-base-text-subdued flex items-center justify-center",
  {
    variants: {
      size: {
        base: "size-9 text-base [&_svg]:size-8",
        large: "text-large size-10 [&_svg]:size-9",
        extraLarge: "text-extra-large size-12 [&_svg]:size-11",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

interface AvatarProps extends VariantProps<typeof avatar> {
  initials?: string;
  className?: string;
}

export function Avatar({size, initials, className}: AvatarProps) {
  return (
    <div
      className={cn(
        avatar({
          size,
        }),
        className,
      )}>
      {isDefined(initials) ? initials : <ProfileIcon aria-hidden />}
    </div>
  );
}
