import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Heading, HeadingGroup} from "#app/components/Heading";

function HeadingStory() {
  return (
    <>
      <Heading>Heading 1</Heading>
      <HeadingGroup>
        <Heading>Heading 2</Heading>
        <HeadingGroup>
          <Heading>Heading 3</Heading>
        </HeadingGroup>
      </HeadingGroup>
    </>
  );
}

const meta = {
  component: HeadingStory,
} satisfies Meta<typeof HeadingStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Heading",
};
