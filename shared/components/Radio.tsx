import {Radio as AriaRadio, type RadioProps} from "react-aria-components";

import {text} from "../styles/text";
import {cn} from "../utils/cn";

export function Radio({children, ...props}: RadioProps) {
  return (
    <AriaRadio
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
              "rounded-fully border-control-border bg-control-background size-5 border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused || isPressed || isSelected,
                "border-critical ring-critical/50 border-2": isInvalid,
                "border-7": isSelected,
              },
            )}
          />
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
    </AriaRadio>
  );
}
