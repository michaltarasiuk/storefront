"use client";

import {
  Tab as AriaTab,
  type TabProps as AriaTabProps,
} from "react-aria-components";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

export {TabList, TabPanel, Tabs} from "react-aria-components";

interface TabProps extends AriaTabProps {
  children: string;
  icon?: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

export function Tab({children, icon: Icon, ...props}: TabProps) {
  return (
    <AriaTab
      {...props}
      className={cn(
        "rounded-base flex cursor-pointer items-center justify-center gap-2 px-5 py-3.5",
        "selected:bg-base-background-subdued",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        props.className,
      )}>
      {({isSelected}) => (
        <>
          {isDefined(Icon) && (
            <Icon
              className={cn(
                "stroke-base-text-subdued hidden sm:inline",
                isSelected && "stroke-control-accent",
              )}
            />
          )}
          <span
            data-text={children}
            className={cn(
              "font-primary text-base-text-subdued inline-flex flex-col text-base",
              "before:pointer-events-none before:invisible before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)] before:select-none",
              isSelected && "text-control-accent font-semibold",
            )}>
            {children}
          </span>
        </>
      )}
    </AriaTab>
  );
}
