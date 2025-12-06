import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import type {VariantProps} from "cva";

import {Text} from "#app/components/Text";

type TextProps = VariantProps<typeof Text>;

const meta = {
  component: Text,
  argTypes: {
    children: {
      name: "text",
      type: {
        name: "string",
        required: true,
      },
    },
    font: {
      control: "select",
      options: ["primary", "secondary"] satisfies TextProps["font"][],
    },
    appearance: {
      control: "select",
      options: [
        "base",
        "accent",
        "subdued",
        "contrast",
        "decorative",
        "control",
        "info",
        "success",
        "warning",
        "critical",
      ] satisfies TextProps["appearance"][],
    },
    emphasis: {
      control: "select",
      options: ["base", "italic", "semibold"] satisfies TextProps["emphasis"][],
    },
    size: {
      control: "select",
      options: [
        "extraSmall",
        "small",
        "base",
        "medium",
        "large",
        "extraLarge",
      ] satisfies TextProps["size"][],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Text",
  args: {
    children: "Text",
  },
};
