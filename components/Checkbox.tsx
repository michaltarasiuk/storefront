import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components";

import {CheckmarkIcon} from "../icons/CheckmarkIcon";
import {text} from "../styles/text";
import {cn} from "../utils/cn";

export function Checkbox({children, ...props}: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={cn(
        "gap-small-100 flex cursor-pointer items-center",
        "disabled:cursor-default disabled:opacity-50",
        text(),
        props.className,
      )}>
      {({
        isFocusVisible,
        isFocused,
        isInvalid,
        isPressed,
        isSelected,
        ...renderProps
      }) => (
        <>
          <div
            className={cn(
              "flex size-5 items-center justify-center",
              "border-control-border bg-control-background rounded-small border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused || isPressed,
                "border-critical ring-critical/50 border-2": isInvalid,
                "bg-critical border-critical": isInvalid && isSelected,
                "bg-control-accent border-control-accent":
                  isSelected && !isInvalid,
              },
            )}>
            <CheckmarkIcon
              aria-hidden
              className={cn("stroke-control-accent-contrast size-3")}
            />
          </div>
          {typeof children === "function"
            ? children({
                isFocusVisible,
                isFocused,
                isInvalid,
                isPressed,
                isSelected,
                ...renderProps,
              })
            : children}
        </>
      )}
    </AriaCheckbox>
  );
}
