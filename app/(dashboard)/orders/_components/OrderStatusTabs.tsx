"use client";

import {useId} from "react";
import {
  Tab,
  TabList,
  TabPanel,
  type TabProps,
  Tabs,
} from "react-aria-components";

import {ClockIcon} from "@/shared/icons/ClockIcon";
import {OrderBoxIcon} from "@/shared/icons/OrderBoxIcon";
import {cn} from "@/shared/utils/cn";

export function OrderStatusTabs() {
  const confirmedTabId = useId();
  const pendingTabId = useId();
  return (
    <Tabs>
      <TabList aria-label="Order Status Tabs" className={cn("flex gap-3.5")}>
        <OrderStatusTab id={confirmedTabId} icon={OrderBoxIcon}>
          Confirmed
        </OrderStatusTab>
        <OrderStatusTab id={pendingTabId} icon={ClockIcon}>
          Pending
        </OrderStatusTab>
      </TabList>
      <TabPanel id={confirmedTabId}></TabPanel>
      <TabPanel id={pendingTabId}></TabPanel>
    </Tabs>
  );
}

interface OrderStatusTabProps extends TabProps {
  children: string;
  icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

function OrderStatusTab({children, icon: Icon, ...props}: OrderStatusTabProps) {
  return (
    <Tab
      {...props}
      className={cn(
        "rounded-base flex cursor-pointer items-center gap-2 px-5 py-3.5",
        "selected:bg-base-background-subdued",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        props.className,
      )}>
      {({isSelected}) => (
        <>
          <Icon
            className={cn(
              "stroke-base-text-subdued hidden sm:inline",
              isSelected && "stroke-control-accent",
            )}
          />
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
    </Tab>
  );
}
