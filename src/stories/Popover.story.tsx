import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {
  LanguageSelectorAutocomplete,
  LanguageSelectorButton,
} from "#app/components/LanguageSelector";
import {Popover, PopoverTrigger} from "#app/components/Popover";

type PopoverStoryProps = React.ComponentProps<typeof Popover>;

function PopoverStory(props: PopoverStoryProps) {
  return (
    <PopoverTrigger {...props}>
      <LanguageSelectorButton />
      <Popover>
        <LanguageSelectorAutocomplete />
      </Popover>
    </PopoverTrigger>
  );
}

const meta = {
  component: PopoverStory,
  argTypes: {
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
      ] satisfies PopoverStoryProps["placement"][],
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
} satisfies Meta<typeof PopoverStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Popover",
  args: {},
};
