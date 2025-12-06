import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {ContentPlaceholder} from "#app/components/ContentPlaceholder";
import {IconButton} from "#app/components/IconButton";
import {Sheet, SheetTrigger} from "#app/components/Sheet";
import {HamburgerIcon} from "#app/icons/HamburgerIcon";
import {cn} from "#app/utils/cn";

type SheetTriggerProps = React.ComponentProps<typeof SheetTrigger>;
type SheetProps = React.ComponentProps<typeof Sheet>;

type SheetStoryProps = Pick<SheetTriggerProps, "defaultOpen"> &
  Pick<SheetProps, "side">;

function SheetStory({defaultOpen, side}: SheetStoryProps) {
  return (
    <SheetTrigger defaultOpen={defaultOpen}>
      <IconButton variant="outline" className={cn("p-small-100")}>
        <HamburgerIcon />
      </IconButton>
      <Sheet side={side} className={cn("p-base")}>
        <ContentPlaceholder />
      </Sheet>
    </SheetTrigger>
  );
}

const meta = {
  component: SheetStory,
  argTypes: {
    defaultOpen: {
      control: "boolean",
    },
    side: {
      control: "select",
      options: ["start", "end"] satisfies SheetProps["side"][],
    },
  },
} satisfies Meta<typeof SheetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Sheet",
};
