"use client";

import {useId} from "react";

import {Tab, TabList, TabPanel, Tabs} from "@/components/Tabs";
import {ClockIcon} from "@/icons/ClockIcon";
import {OrderBoxIcon} from "@/icons/OrderBoxIcon";
import {cn} from "@/utils/cn";

export function OrderStatusTabs() {
  const confirmedTabId = useId();
  const pendingTabId = useId();
  return (
    <Tabs>
      <TabList aria-label="Order Status Tabs" className={cn("flex gap-3.5")}>
        <Tab id={confirmedTabId} icon={OrderBoxIcon}>
          Confirmed
        </Tab>
        <Tab id={pendingTabId} icon={ClockIcon}>
          Pending
        </Tab>
      </TabList>
      <TabPanel id={confirmedTabId} />
      <TabPanel id={pendingTabId} />
    </Tabs>
  );
}
