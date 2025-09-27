import type {Meta, StoryObj} from "@storybook/nextjs-vite";
import type {TooltipTriggerProps} from "react-aria";
import type {TooltipProps} from "react-aria-components";

import {Button} from "@/components/Button";
import {Tooltip, TooltipTrigger} from "@/components/Tooltip";

type TooltipExampleProps = Pick<
  TooltipTriggerProps,
  "defaultOpen" | "delay" | "closeDelay" | "isDisabled"
> &
  Pick<
    TooltipProps,
    "placement" | "containerPadding" | "offset" | "shouldFlip"
  >;

function TooltipDemo({
  defaultOpen,
  delay,
  closeDelay,
  isDisabled,
  ...props
}: TooltipExampleProps) {
  return (
    <TooltipTrigger
      defaultOpen={defaultOpen}
      delay={delay}
      closeDelay={closeDelay}
      isDisabled={isDisabled}>
      <Button>Hover me</Button>
      <Tooltip {...props}>This is a tooltip message.</Tooltip>
    </TooltipTrigger>
  );
}

const meta = {
  component: TooltipDemo,
  argTypes: {
    defaultOpen: {
      control: "boolean",
    },
    delay: {
      control: "number",
    },
    closeDelay: {
      control: "number",
    },
    isDisabled: {
      control: "boolean",
    },
    placement: {
      control: "select",
      options: [
        "bottom",
        "bottom left",
        "bottom right",
        "bottom start",
        "bottom end",
        "top",
        "top left",
        "top right",
        "top start",
        "top end",
        "left",
        "left top",
        "left bottom",
        "start",
        "start top",
        "start bottom",
        "right",
        "right top",
        "right bottom",
        "end",
        "end top",
        "end bottom",
      ] satisfies TooltipExampleProps["placement"][],
    },
    containerPadding: {
      control: "number",
      description:
        "The placement padding that should be applied between the element and its surrounding container",
    },
    offset: {
      control: "number",
      description:
        "The additional offset applied along the main axis between the element and its anchor element",
    },
    shouldFlip: {
      control: "boolean",
      description:
        "Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient space to render",
    },
  },
} satisfies Meta<typeof TooltipDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Tooltip",
  args: {
    offset: 10,
  },
};
