import {
  Label,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";

import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

interface RadioGroupProps extends AriaRadioGroupProps {
  label?: string;
}

export function RadioGroup({label, children, ...props}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props}>
      {(renderProps) => (
        <>
          {isDefined(label) && (
            <Label
              className={cn(
                text({
                  font: "secondary",
                  emphasis: "semibold",
                }),
              )}>
              {label}
            </Label>
          )}
          <div
            className={cn("gap-base flex flex-col", {
              "ms-base mt-base": isDefined(label),
            })}>
            {typeof children === "function" ? children(renderProps) : children}
          </div>
        </>
      )}
    </AriaRadioGroup>
  );
}
