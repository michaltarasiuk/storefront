"use client";

import {
  FieldError as AriaFieldError,
  type FieldErrorProps,
} from "react-aria-components";

import {cn} from "@/utils/cn";

import {text} from "../styles/text";

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
