import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Switch} from "@/components/Switch";

const meta = {
  component: Switch,
  argTypes: {
    children: {
      name: "Label",
      type: {
        name: "string",
        required: true,
      },
    },
    defaultSelected: {
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Switch",
  args: {
    children: "Label",
  },
};
