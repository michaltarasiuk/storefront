import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {SearchField} from "@/components/SearchField";

const meta = {
  component: SearchField,
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
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "SearchField",
  args: {
    label: "Label",
  },
};
