"use client";

import {
  OverlayArrow,
  Tooltip as AriaTooltip,
  TooltipProps,
} from "react-aria-components";

import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

export {TooltipTrigger} from "react-aria-components";

export function Tooltip({children, ...props}: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={cn(
        "p-small-100 bg-base-text rounded-base max-w-48",
        "entering:animate-in entering:fade-in-0 entering:zoom-in-95",
        "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
        text({
          appearance: "contrast",
        }),
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
