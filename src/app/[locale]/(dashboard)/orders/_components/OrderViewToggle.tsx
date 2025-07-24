"use client";

import {use, useId} from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonProps,
} from "react-aria-components";

import {FormattedMessage} from "@/i18n/react-intl";
import {GridIcon} from "@/icons/GridIcon";
import {ListIcon} from "@/icons/ListIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {OrderViewContext} from "../_utils/order-view-context";

export function OrderViewToggle() {
  const {orderView, setOrderView} = use(OrderViewContext);
  const gridViewId = useId();
  const tableViewId = useId();
  return (
    <ToggleButtonGroup
      selectedKeys={[orderView === "grid" ? gridViewId : tableViewId]}
      onSelectionChange={([key]) => {
        if (isDefined(key)) {
          const selectedView = key === gridViewId ? "grid" : "table";
          setOrderView?.(selectedView);
        }
      }}
      className={cn("rounded-large gap-small-200 flex p-1")}>
      <OrderViewToggleButton id={gridViewId} icon={GridIcon}>
        <FormattedMessage id="zL39WD" defaultMessage="Grid View" />
      </OrderViewToggleButton>
      <OrderViewToggleButton id={tableViewId} icon={ListIcon}>
        <FormattedMessage id="FQyBR6" defaultMessage="Table View" />
      </OrderViewToggleButton>
    </ToggleButtonGroup>
  );
}

interface OrderViewToggleButtonProps extends ToggleButtonProps {
  icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

function OrderViewToggleButton({
  children,
  icon: Icon,
  ...props
}: OrderViewToggleButtonProps) {
  return (
    <ToggleButton
      {...props}
      className={cn(
        "rounded-base flex size-9 cursor-pointer items-center justify-center",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        "selected:bg-base-background",
        props.className,
      )}>
      {({isFocusVisible, isSelected, ...renderProps}) => (
        <>
          <Icon
            aria-hidden
            className={cn(
              "stroke-base-text-subdued",
              (isFocusVisible || isSelected) && "stroke-control-accent",
            )}
          />
          <span className={cn("sr-only")}>
            {typeof children === "function"
              ? children({
                  isFocusVisible,
                  isSelected,
                  ...renderProps,
                })
              : children}
          </span>
        </>
      )}
    </ToggleButton>
  );
}
