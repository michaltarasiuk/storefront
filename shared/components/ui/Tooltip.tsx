"use client";

import {cn} from "@/shared/utils/cn";
import {
  Tooltip as AriaTooltip,
  OverlayArrow,
  TooltipProps,
} from "react-aria-components";

export function Tooltip({children, ...props}: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={cn(
        "p-small-100 max-w-48",
        "bg-base-text rounded-base",
        "text-base-text-contrast font-primary text-base font-normal",
        "entering:animate-in entering:fade-in-0 entering:zoom-in-95",
        "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
        props.className,
      )}>
      {(renderProps) => (
        <>
          <OverlayArrow>
            {({placement}) => (
              <div
                className={cn(
                  "bg-base-text h-3 w-3 rotate-45",
                  placement === "top" && "-translate-y-1.5",
                  placement === "right" && "translate-x-1.5",
                  placement === "bottom" && "translate-y-1.5",
                  placement === "left" && "-translate-x-1.5",
                  placement === "center" && "hidden",
                )}
              />
            )}
          </OverlayArrow>
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </AriaTooltip>
  );
}
