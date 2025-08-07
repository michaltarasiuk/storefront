import {cn} from "@/utils/cn";
import {Input as AriaInput, type InputProps} from "react-aria-components";

export function Input(props: InputProps) {
  return (
    <AriaInput
      {...props}
      className={cn(
        "rounded-base font-primary border-control-border bg-control-background text-control-text w-full border text-base transition-all duration-300",
        "placeholder:text-control-text-subdued",
        "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:shadow-none focus:ring-3",
        "invalid:border-critical invalid:ring-critical invalid:ring-1",
        "disabled:bg-[#F8F8F8] disabled:opacity-50",
        props.className,
      )}
    />
  );
}
