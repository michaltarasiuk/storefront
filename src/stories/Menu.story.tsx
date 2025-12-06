import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Button} from "#app/components/Button";
import {Menu, MenuItem, MenuTrigger} from "#app/components/Menu";

type MenuProps = React.ComponentProps<typeof Menu>;

function MenuStory(props: MenuProps) {
  return (
    <MenuTrigger>
      <Button kind="secondary">Manage</Button>
      <Menu {...props}>
        <MenuItem>Label 1</MenuItem>
        <MenuItem isDisabled>Label 2</MenuItem>
        <MenuItem critical>Label 3</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}

const meta = {
  component: MenuStory,
  argTypes: {
    escapeKeyBehavior: {
      control: "select",
      options: [
        "clearSelection",
        "none",
      ] satisfies MenuProps["escapeKeyBehavior"][],
    },
    autoFocus: {
      control: "boolean",
    },
    shouldFocusWrap: {
      control: "boolean",
    },
    selectionMode: {
      control: "select",
      options: [
        "multiple",
        "none",
        "single",
      ] satisfies MenuProps["selectionMode"][],
    },
  },
} satisfies Meta<typeof MenuStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Menu",
};
