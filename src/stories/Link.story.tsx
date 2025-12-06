import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Link} from "#app/components/Link";

const meta = {
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Link",
  args: {
    children: "Link",
  },
};
