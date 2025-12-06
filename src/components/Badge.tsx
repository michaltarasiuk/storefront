import {cva, type VariantProps} from "cva";

import {text} from "#app/styles/text";
import {cn} from "#app/utils/cn";

const badge = cva(
  "px-small-300 gap-small-400 rounded-fully inline-flex items-center justify-center border py-px",
  {
    variants: {
      tone: {
        base: "bg-base-text-subdued border-base-text-subdued text-base-text-contrast",
        critical:
          "bg-critical-border border-critical-border text-critical-text",
        subdued: "text-base-text border-base-border bg-base-background-subdued",
      },
      size: {
        base: "text-small min-h-6 min-w-6",
        small: "text-extra-small min-h-5 min-w-5",
      },
      iconPosition: {
        start: "flex-row",
        end: "flex-row-reverse",
      },
    },
    defaultVariants: {
      tone: "base",
      size: "base",
      iconPosition: "start",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badge> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({children, icon, tone, size, iconPosition}: BadgeProps) {
  return (
    <div
      role={tone === "critical" ? "alert" : "status"}
      className={cn(
        text({
          emphasis: "semibold",
        }),
        badge({
          tone,
          size,
          iconPosition,
        }),
      )}>
      {icon}
      {children}
    </div>
  );
}
