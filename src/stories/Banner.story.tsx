import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Banner} from "#app/components/Banner";

type BannerProps = React.ComponentProps<typeof Banner>;

const meta = {
  component: Banner,
  argTypes: {
    status: {
      control: "select",
      options: [
        "info",
        "success",
        "warning",
        "critical",
      ] satisfies BannerProps["status"][],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Banner",
  args: {
    status: "info",
    title: "Title",
  },
};
