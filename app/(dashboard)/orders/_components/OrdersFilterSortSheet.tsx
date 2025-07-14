"use client";

import {useId} from "react";

import {Button} from "@/components/Button";
import {IconButton} from "@/components/IconButton";
import {Radio} from "@/components/Radio";
import {RadioGroup} from "@/components/RadioGroup";
import {Sheet, SheetTrigger} from "@/components/Sheet";
import {Tab, TabList, TabPanel, Tabs} from "@/components/Tabs";
import {FilterIcon} from "@/icons/FilterIcon";
import {cn} from "@/utils/cn";

export function OrdersFilterSortSheet() {
  const sortTabId = useId();
  const filterTabId = useId();
  return (
    <SheetTrigger>
      <IconButton
        aria-label="Show filter and sort options for orders"
        className={cn("[&_svg]:stroke-base-icon size-9")}>
        <FilterIcon aria-hidden />
      </IconButton>
      <Sheet side="end" className={cn("flex flex-col justify-between")}>
        <Tabs>
          <TabList
            className={cn(
              "gap-base grid grid-cols-2",
              "p-large-200 shadow-extra-small",
            )}>
            <Tab id={sortTabId}>Sort</Tab>
            <Tab id={filterTabId}>Filter</Tab>
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
            "gap-base grid grid-cols-2",
            "shadow-extra-large p-large-200",
          )}>
          <Button kind="plain">Clear all</Button>
          <Button>Apply</Button>
        </div>
      </Sheet>
    </SheetTrigger>
  );
}

function SortOptions() {
  return (
    <RadioGroup aria-label="Sort orders">
      <Radio value="newest">Newest to oldest</Radio>
      <Radio value="oldest">Oldest to newest</Radio>
      <Radio value="numberHigh">Order number (high to low)</Radio>
      <Radio value="numberLow">Order number (low to high)</Radio>
      <Radio value="totalHigh">Order total (high to low)</Radio>
      <Radio value="totalLow">Order total (low to high)</Radio>
    </RadioGroup>
  );
}

function FilterOptions() {
  return (
    <RadioGroup label="Order date">
      <Radio value="today">Today</Radio>
      <Radio value="last7days">Last 7 days</Radio>
      <Radio value="last30days">Last 30 days</Radio>
      <Radio value="last90days">Last 90 days</Radio>
      <Radio value="last12months">Last 12 months</Radio>
      <Radio value="custom">Custom</Radio>
    </RadioGroup>
  );
}
