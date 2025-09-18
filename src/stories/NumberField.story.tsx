import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {NumberField} from "@/components/NumberField";

const meta = {
  component: NumberField,
  argTypes: {
    isInvalid: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
    autoFocus: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "NumberField",
  args: {
    label: "Label",
  },
};
