import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import {useId} from "react";

import {Tab, TabList, TabPanel, Tabs} from "#app/components/Tabs";
import {Text} from "#app/components/Text";
import {ClockIcon} from "#app/icons/ClockIcon";
import {OrderBoxIcon} from "#app/icons/OrderBoxIcon";

function TabsStory() {
  const confirmedTabId = useId();
  const pendingTabId = useId();
  return (
    <Tabs>
      <TabList>
        <Tab id={confirmedTabId} icon={OrderBoxIcon} textValue="Confirmed" />
        <Tab id={pendingTabId} icon={ClockIcon} textValue="Pending" />
      </TabList>
      <TabPanel id={confirmedTabId}>
        <Text>Confirmed Tab</Text>
      </TabPanel>
      <TabPanel id={pendingTabId}>
        <Text>Pending Tab</Text>
      </TabPanel>
    </Tabs>
  );
}

const meta = {
  component: TabsStory,
} satisfies Meta<typeof TabsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Tabs",
};
