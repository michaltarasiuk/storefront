import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Checkbox} from "#app/components/Checkbox";

const meta = {
  component: Checkbox,
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
    isInvalid: {
      control: "boolean",
    },
    autoFocus: {
      control: "boolean",
    },
    value: {
      table: {
        disable: true,
      },
    },
    primaryContent: {
      table: {
        disable: true,
      },
    },
    secondaryContent: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Checkbox",
  args: {
    value: "value",
    children: "Label",
  },
};
