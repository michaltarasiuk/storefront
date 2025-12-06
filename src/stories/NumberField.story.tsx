import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {NumberField} from "#app/components/NumberField";

const meta = {
  component: NumberField,
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
    isInvalid: {
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
