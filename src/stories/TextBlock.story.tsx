import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {TextBlock} from "#app/components/TextBlock";

type TextBlockProps = React.ComponentProps<typeof TextBlock>;

const meta = {
  component: TextBlock,
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
      options: ["primary", "secondary"] satisfies TextBlockProps["font"][],
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
      ] satisfies TextBlockProps["appearance"][],
    },
    emphasis: {
      control: "select",
      options: [
        "base",
        "italic",
        "semibold",
      ] satisfies TextBlockProps["emphasis"][],
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
      ] satisfies TextBlockProps["size"][],
    },
  },
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "TextBlock",
  args: {
    children: "A quick brown fox jumps over the lazy dog.",
  },
};
