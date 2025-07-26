"use client";

import {useId} from "react";

import {Tab, TabList, TabPanel, Tabs} from "@/components/Tabs";
import {useIntl} from "@/i18n/react-intl";
import {ClockIcon} from "@/icons/ClockIcon";
import {OrderBoxIcon} from "@/icons/OrderBoxIcon";
import {cn} from "@/utils/cn";

export function OrderStatusTabs() {
  const confirmedTabId = useId();
  const pendingTabId = useId();
  const intl = useIntl();
  return (
    <Tabs className={cn("min-h-12")}>
      <TabList
        aria-label={intl.formatMessage({
          id: "C9WQ46",
          defaultMessage: "Order Status Tabs",
        })}
        className={cn("gap-base flex")}>
        <Tab
          id={confirmedTabId}
          icon={OrderBoxIcon}
          textValue={intl.formatMessage({
            id: "dX7+Rv",
            defaultMessage: "Confirmed",
          })}
        />
        <Tab
          id={pendingTabId}
          icon={ClockIcon}
          textValue={intl.formatMessage({
            id: "eKEL/g",
            defaultMessage: "Pending",
          })}
        />
      </TabList>
      <TabPanel id={confirmedTabId} />
      <TabPanel id={pendingTabId} />
    </Tabs>
  );
}
