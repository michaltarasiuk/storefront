import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Spinner} from "#app/components/Spinner";

type SpinnerProps = React.ComponentProps<typeof Spinner>;

const meta = {
  component: Spinner,
  argTypes: {
    size: {
      control: "select",
      options: [
        "extraSmall",
        "small",
        "base",
        "large",
        "fill",
      ] satisfies SpinnerProps["size"][],
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Spinner",
};
