"use client";

import {useId} from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonProps,
} from "react-aria-components";

import {GridIcon} from "@/shared/icons/GridIcon";
import {ListIcon} from "@/shared/icons/ListIcon";
import {cn} from "@/shared/utils/cn";

export function OrderViewSwitcher() {
  const gridViewId = useId();
  const listViewId = useId();
  return (
    <ToggleButtonGroup
      defaultSelectedKeys={[gridViewId]}
      className={cn("rounded-large flex gap-2 p-1")}>
      <ViewToggleButton id={gridViewId} icon={GridIcon}>
        Grid View
      </ViewToggleButton>
      <ViewToggleButton id={listViewId} icon={ListIcon}>
        List View
      </ViewToggleButton>
    </ToggleButtonGroup>
  );
}

interface ViewToggleButtonProps extends ToggleButtonProps {
  icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

function ViewToggleButton({
  children,
  icon: Icon,
  ...props
}: ViewToggleButtonProps) {
  return (
    <ToggleButton
      {...props}
      className={cn(
        "cursor-pointer rounded-lg p-2.5",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        "selected:bg-base-background",
        props.className,
      )}>
      {({isHovered, isSelected, isFocusVisible, ...renderProps}) => (
        <>
          <Icon
            aria-hidden
            className={cn(
              "stroke-base-text-subdued transition-colors",
              (isHovered || isSelected || isFocusVisible) &&
                "stroke-control-accent",
            )}
          />
          <span className={cn("sr-only")}>
            {typeof children === "function"
              ? children({
                  isHovered,
                  isSelected,
                  isFocusVisible,
                  ...renderProps,
                })
              : children}
          </span>
        </>
      )}
    </ToggleButton>
  );
}
