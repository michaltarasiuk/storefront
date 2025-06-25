"use client";

import {
  FieldError as AriaFieldError,
  type FieldErrorProps,
} from "react-aria-components";
import {text} from "./Text";
import {cn} from "@/shared/utils/cn";

export function FieldError({children, ...props}: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={cn(
        text({
          appearance: "critical",
        }),
        props.className,
      )}>
      {children}
    </AriaFieldError>
  );
}
