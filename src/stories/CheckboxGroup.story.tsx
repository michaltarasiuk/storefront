import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Checkbox} from "#app/components/Checkbox";
import {CheckboxGroup} from "#app/components/CheckboxGroup";

type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroup>;

function CheckboxGroupStory(props: CheckboxGroupProps) {
  return (
    <CheckboxGroup {...props}>
      <Checkbox value="1">Label 1</Checkbox>
      <Checkbox value="2">Label 2</Checkbox>
      <Checkbox value="3">Label 3</Checkbox>
    </CheckboxGroup>
  );
}

const meta = {
  component: CheckboxGroupStory,
  argTypes: {
    variant: {
      control: "select",
      options: ["base", "group"] satisfies CheckboxGroupProps["variant"][],
    },
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CheckboxGroupStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "CheckboxGroup",
};
