"use client";

import {
  Tab as AriaTab,
  TabList as AriaTabList,
  type TabListProps,
  TabPanel as AriaTabPanel,
  type TabPanelProps,
  type TabProps as AriaTabProps,
} from "react-aria-components";

import {text} from "#app/styles/text";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

export {Tabs} from "react-aria-components";

export function TabList<T extends object>({
  children,
  ...props
}: TabListProps<T>) {
  return (
    <AriaTabList<T> {...props} className={cn("gap-base flex", props.className)}>
      {children}
    </AriaTabList>
  );
}

export function TabPanel({children, ...props}: TabPanelProps) {
  return (
    <AriaTabPanel {...props} className={cn("outline-none", props.className)}>
      {children}
    </AriaTabPanel>
  );
}

interface TabProps extends AriaTabProps {
  textValue: string;
  icon?: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

export function Tab({textValue, icon: Icon, children, ...props}: TabProps) {
  return (
    <AriaTab
      {...props}
      className={cn(
        "rounded-base py-base gap-small-300 px-large-200 flex cursor-pointer items-center justify-center",
        "selected:bg-base-background-subdued",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        props.className,
      )}>
      {({isSelected, ...renderProps}) => (
        <>
          {isDefined(Icon) && (
            <Icon
              className={cn("stroke-base-text-subdued hidden sm:inline", {
                "stroke-control-accent": isSelected,
              })}
            />
          )}
          <span
            data-text={textValue}
            className={cn(
              "inline-flex flex-col",
              "before:pointer-events-none before:invisible before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)] before:select-none",
              text(
                isSelected
                  ? {appearance: "accent", emphasis: "semibold"}
                  : {appearance: "subdued"},
              ),
            )}>
            {!isDefined(children)
              ? textValue
              : typeof children === "function"
                ? children({
                    isSelected,
                    ...renderProps,
                  })
                : children}
          </span>
        </>
      )}
    </AriaTab>
  );
}
