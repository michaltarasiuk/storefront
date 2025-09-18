import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Button} from "@/components/Button";

type ButtonProps = React.ComponentProps<typeof Button>;

const meta = {
  component: Button,
  argTypes: {
    children: {
      name: "Label",
      type: {
        name: "string",
        required: true,
      },
    },
    appearance: {
      control: "select",
      options: ["base", "critical"] satisfies ButtonProps["appearance"][],
    },
    kind: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "plain",
      ] satisfies ButtonProps["kind"][],
    },
    size: {
      control: "select",
      options: [
        "small",
        "base",
        "large",
        "extraLarge",
      ] satisfies ButtonProps["size"][],
    },
    isDisabled: {
      control: "boolean",
    },
    isPending: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Button",
  args: {
    children: "Label",
  },
};
