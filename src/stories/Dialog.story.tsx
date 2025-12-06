import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Button} from "#app/components/Button";
import {ContentPlaceholder} from "#app/components/ContentPlaceholder";
import {Dialog, DialogTrigger, Modal} from "#app/components/Dialog";
import {cn} from "#app/utils/cn";

type DialogTriggerProps = React.ComponentProps<typeof DialogTrigger>;
type ModalProps = React.ComponentProps<typeof Modal>;
type DialogProps = React.ComponentProps<typeof Dialog>;

type DialogStoryProps = Pick<DialogTriggerProps, "defaultOpen"> &
  Pick<ModalProps, "size" | "isDismissable"> &
  Pick<DialogProps, "heading">;

function DialogStory({
  defaultOpen,
  size,
  isDismissable,
  heading,
}: DialogStoryProps) {
  return (
    <DialogTrigger defaultOpen={defaultOpen}>
      <Button>Open dialog</Button>
      <Modal size={size} isDismissable={isDismissable}>
        <Dialog heading={heading}>
          <ContentPlaceholder className={cn("min-h-48")} />
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

const meta = {
  component: DialogStory,
  argTypes: {
    defaultOpen: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: [
        "auto",
        "small",
        "base",
        "large",
        "max",
      ] satisfies DialogStoryProps["size"][],
    },
    isDismissable: {
      control: "boolean",
    },
    heading: {
      control: "text",
    },
  },
} satisfies Meta<typeof DialogStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Dialog",
};
