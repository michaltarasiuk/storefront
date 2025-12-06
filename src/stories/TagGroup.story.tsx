import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import {useListData} from "react-stately";

import {Tag, TagGroup} from "#app/components/TagGroup";
import {DiscountIcon} from "#app/icons/DiscountIcon";

type TagGroupStoryProps = React.ComponentProps<typeof TagGroup>;

function TagGroupStory(props: TagGroupStoryProps) {
  const list = useListData({
    initialItems: [
      {id: 1, name: "SPRING20"},
      {id: 2, name: "SUMMER15"},
      {id: 3, name: "FALL10"},
      {id: 4, name: "WINTER5"},
    ],
  });
  return (
    <TagGroup onRemove={(keys) => list.remove(...keys)} {...props}>
      {list.items.map((item) => (
        <Tag key={item.id} id={item.id} icon={DiscountIcon}>
          {item.name}
        </Tag>
      ))}
    </TagGroup>
  );
}

const meta = {
  component: TagGroupStory,
  argTypes: {
    selectionBehavior: {
      control: "select",
      options: [
        "replace",
        "toggle",
      ] satisfies TagGroupStoryProps["selectionBehavior"][],
    },
    shouldSelectOnPressUp: {
      control: "boolean",
    },
    selectionMode: {
      control: "select",
      options: [
        "multiple",
        "none",
        "single",
      ] satisfies TagGroupStoryProps["selectionMode"][],
    },
  },
} satisfies Meta<typeof TagGroupStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "TagGroup",
};
