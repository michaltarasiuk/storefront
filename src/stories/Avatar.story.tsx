import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Avatar} from "#app/components/Avatar";

type AvatarProps = React.ComponentProps<typeof Avatar>;

const meta = {
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["base", "large", "extraLarge"] satisfies AvatarProps["size"][],
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Avatar",
};
