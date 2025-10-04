import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {TextField} from "@/components/TextField";

const meta = {
  component: TextField,
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
    isUppercased: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "TextField",
  args: {
    label: "Label",
  },
};
