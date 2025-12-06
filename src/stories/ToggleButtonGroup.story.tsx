import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Text} from "#app/components/Text";
import {
  ToggleButton,
  ToggleButtonGroup,
} from "#app/components/ToggleButtonGroup";

function ToggleButtonGroupStory() {
  return (
    <ToggleButtonGroup>
      <ToggleButton>
        <Text emphasis="semibold">15%</Text>
        <Text>$7.50</Text>
      </ToggleButton>
      <ToggleButton>
        <Text emphasis="semibold">20%</Text>
        <Text>$5.99</Text>
      </ToggleButton>
      <ToggleButton>
        <Text emphasis="semibold">25%</Text>
        <Text>$9.49</Text>
      </ToggleButton>
      <ToggleButton>
        <Text emphasis="semibold">None</Text>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const meta = {
  component: ToggleButtonGroupStory,
} satisfies Meta<typeof ToggleButtonGroupStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "ToggleButtonGroup",
};
