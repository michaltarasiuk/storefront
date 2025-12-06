import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Radio} from "#app/components/Radio";
import {RadioGroup} from "#app/components/RadioGroup";

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>;

function RadioGroupStory(props: RadioGroupProps) {
  return (
    <RadioGroup {...props}>
      <Radio value="1">Label 1</Radio>
      <Radio value="2">Label 2</Radio>
      <Radio value="3">Label 3</Radio>
    </RadioGroup>
  );
}

const meta = {
  component: RadioGroupStory,
  argTypes: {
    variant: {
      control: "select",
      options: ["base", "group"] satisfies RadioGroupProps["variant"][],
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
} satisfies Meta<typeof RadioGroupStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "RadioGroup",
};
