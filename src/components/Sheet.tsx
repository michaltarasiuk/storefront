"use client";

import {cva} from "class-variance-authority";
import {Dialog, DialogProps, Modal, ModalOverlay} from "react-aria-components";

import {cn} from "../utils/cn";

export {DialogTrigger as SheetTrigger} from "react-aria-components";

type Side = "start" | "end";

const modalOverlay = cva(
  [
    "fixed inset-0 z-50 flex items-stretch bg-black/60",
    "entering:animate-in entering:fade-in-0",
    "exiting:animate-out exiting:fade-out-0",
  ],
  {
    variants: {
      side: {
        start: "justify-start",
        end: "justify-end",
      } satisfies Record<Side, string>,
    },
    defaultVariants: {
      side: "start",
    },
  },
);

const modal = cva(
  ["w-[80dvw] sm:w-80", "entering:animate-in exiting:animate-out"],
  {
    variants: {
      side: {
        start: "entering:slide-in-from-start exiting:slide-out-to-start",
        end: "entering:slide-in-from-end exiting:slide-out-to-end",
      } satisfies Record<Side, string>,
    },
    defaultVariants: {
      side: "start",
    },
  },
);

interface SheetProps extends DialogProps {
  side?: Side;
}

export function Sheet({side, children, ...props}: SheetProps) {
  return (
    <ModalOverlay
      className={cn(
        modalOverlay({
          side,
        }),
      )}
      isDismissable>
      <Modal
        className={cn(
          modal({
            side,
          }),
        )}>
        <Dialog
          {...props}
          className={cn(
            "bg-base-background h-full",
            "outline-none",
            props.className,
          )}>
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
