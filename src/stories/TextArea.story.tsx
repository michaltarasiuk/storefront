import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {TextArea} from "@/components/TextArea";

const meta = {
  component: TextArea,
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "TextArea",
  args: {
    label: "Label",
  },
};
