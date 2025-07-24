"use client";

import {useId} from "react";

import {Button} from "@/components/Button";
import {IconButton} from "@/components/IconButton";
import {Radio} from "@/components/Radio";
import {RadioGroup} from "@/components/RadioGroup";
import {Sheet, SheetTrigger} from "@/components/Sheet";
import {Tab, TabList, TabPanel, Tabs} from "@/components/Tabs";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {FilterIcon} from "@/icons/FilterIcon";
import {cn} from "@/utils/cn";

export function OrdersFilterSortSheet() {
  const sortTabId = useId();
  const filterTabId = useId();
  const intl = useIntl();
  return (
    <SheetTrigger>
      <IconButton
        aria-label={intl.formatMessage({
          id: "NWiwy9",
          defaultMessage: "Show filter and sort options for orders",
        })}
        className={cn("[&_svg]:stroke-base-icon size-9")}>
        <FilterIcon aria-hidden />
      </IconButton>
      <Sheet side="end" className={cn("flex flex-col justify-between")}>
        <Tabs>
          <TabList
            className={cn(
              "gap-base p-large-200 shadow-extra-small grid grid-cols-2",
            )}>
            <Tab
              id={sortTabId}
              textValue={intl.formatMessage({
                id: "25oM9Q",
                defaultMessage: "Sort",
              })}
            />
            <Tab
              id={filterTabId}
              textValue={intl.formatMessage({
                id: "9Obw6C",
                defaultMessage: "Filter",
              })}
            />
          </TabList>
          <div className={cn("p-large-200")}>
            <TabPanel id={sortTabId}>
              <SortOptions />
            </TabPanel>
            <TabPanel id={filterTabId}>
              <FilterOptions />
            </TabPanel>
          </div>
        </Tabs>
        <div
          className={cn(
            "gap-base shadow-extra-large p-large-200 grid grid-cols-2",
          )}>
          <Button kind="plain">
            <FormattedMessage id="/GCoTA" defaultMessage="Clear" />
          </Button>
          <Button>
            <FormattedMessage id="EWw/tK" defaultMessage="Apply" />
          </Button>
        </div>
      </Sheet>
    </SheetTrigger>
  );
}

function SortOptions() {
  const intl = useIntl();
  return (
    <RadioGroup
      aria-label={intl.formatMessage({
        id: "RpOD8c",
        defaultMessage: "Sort orders",
      })}>
      <Radio value="newest">
        <FormattedMessage id="5mUL+f" defaultMessage="Newest to oldest" />
      </Radio>
      <Radio value="oldest">
        <FormattedMessage id="i7vqD3" defaultMessage="Oldest to newest" />
      </Radio>
      <Radio value="numberHigh">
        <FormattedMessage
          id="/bIuBb"
          defaultMessage="Order number (high to low)"
        />
      </Radio>
      <Radio value="numberLow">
        <FormattedMessage
          id="ISmib3"
          defaultMessage="Order number (low to high)"
        />
      </Radio>
      <Radio value="totalHigh">
        <FormattedMessage
          id="I2BSqV"
          defaultMessage="Order total (high to low)"
        />
      </Radio>
      <Radio value="totalLow">
        <FormattedMessage
          id="vqKTqE"
          defaultMessage="Order total (low to high)"
        />
      </Radio>
    </RadioGroup>
  );
}

function FilterOptions() {
  const intl = useIntl();
  return (
    <RadioGroup
      label={intl.formatMessage({
        id: "nYDnup",
        defaultMessage: "Order date",
      })}>
      <Radio value="today">
        <FormattedMessage id="zWgbGg" defaultMessage="Today" />
      </Radio>
      <Radio value="last7days">
        <FormattedMessage id="irFBKn" defaultMessage="Last 7 days" />
      </Radio>
      <Radio value="last30days">
        <FormattedMessage id="Rfvi9/" defaultMessage="Last 30 days" />
      </Radio>
      <Radio value="last90days">
        <FormattedMessage id="mgYBYo" defaultMessage="Last 90 days" />
      </Radio>
      <Radio value="last12months">
        <FormattedMessage id="r5sWuC" defaultMessage="Last 12 months" />
      </Radio>
      <Radio value="custom">
        <FormattedMessage id="Sjo1P4" defaultMessage="Custom" />
      </Radio>
    </RadioGroup>
  );
}
