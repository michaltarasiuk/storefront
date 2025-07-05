import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components";

import {CheckmarkIcon} from "../icons/CheckmarkIcon";
import {cn} from "../utils/cn";
import {Text} from "./Text";

export function Checkbox({children, ...props}: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={cn(
        "gap-small-100 flex cursor-pointer items-center",
        "disabled:cursor-default disabled:opacity-50",
        props.className,
      )}>
      {({isFocusVisible, isFocused, isInvalid, isSelected, ...renderProps}) => (
        <>
          <div
            className={cn(
              "flex size-5 items-center justify-center",
              "border-control-border bg-control-background rounded-small border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused,
                "border-critical ring-critical/50 border-2": isInvalid,
                "bg-control-accent border-control-accent ring-base-accent/50":
                  isSelected,
              },
            )}>
            <CheckmarkIcon
              aria-hidden
              className={cn("stroke-control-accent-contrast size-3")}
            />
          </div>
          <Text>
            {typeof children === "function"
              ? children({
                  isFocusVisible,
                  isFocused,
                  isInvalid,
                  isSelected,
                  ...renderProps,
                })
              : children}
          </Text>
        </>
      )}
    </AriaCheckbox>
  );
}
