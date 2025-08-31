"use client";

import {cva, type VariantProps} from "class-variance-authority";
import {
  Modal as AriaModal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";
import {Dialog as AriaDialog, type DialogProps} from "react-aria-components";

import {CloseIcon} from "@/icons/CloseIcon";
import {cn} from "@/utils/cn";

import {Heading} from "./Heading";
import {IconButton} from "./IconButton";

export {DialogTrigger} from "react-aria-components";

export function Dialog({children, ...props}: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className={cn(
        "bg-base-background p-large-200 size-full",
        "outline-none",
        props.className,
      )}>
      {children}
    </AriaDialog>
  );
}

export function DialogHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <header className={cn("flex items-center justify-between")}>
      <Heading level={2}>{title}</Heading>
      <IconButton className={cn("size-6")} onClick={onClose}>
        <CloseIcon aria-hidden />
      </IconButton>
    </header>
  );
}

const modal = cva(
  [
    "rounded-t-base sm:rounded-base overflow-hidden",
    "entering:animate-in entering:slide-in-from-bottom sm:entering:slide-in-from-bottom-5 sm:entering:fade-in-0 sm:entering:zoom-in-90",
    "exiting:animate-out exiting:slide-out-to-bottom sm:exiting:slide-out-to-bottom-5 sm:exiting:fade-out-0 sm:exiting:zoom-out-90",
  ],
  {
    variants: {
      size: {
        auto: "sm:w-auto",
        small: "sm:w-full sm:max-w-2xs",
        base: "sm:w-full sm:max-w-md",
        large: "sm:w-full sm:max-w-xl",
        max: "size-full",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

interface ModalProps extends ModalOverlayProps, VariantProps<typeof modal> {}

export function Modal({children, size, ...props}: ModalProps) {
  return (
    <ModalOverlay
      {...props}
      className={cn(
        "fixed inset-0 z-50 flex flex-col justify-end bg-black/50 pt-[calc(var(--spacing-large-300)*2)] backdrop-blur-xs",
        "sm:items-center sm:justify-center sm:px-[calc(var(--spacing-large-500)*2)] sm:py-[calc(var(--spacing-large-400)*3)]",
        "entering:animate-in entering:fade-in-0",
        "exiting:animate-out exiting:fade-out-0",
        props.className,
      )}>
      <AriaModal
        className={cn(
          modal({
            size,
          }),
        )}>
        {children}
      </AriaModal>
    </ModalOverlay>
  );
}
