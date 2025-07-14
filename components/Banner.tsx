"use client";

import {cva} from "class-variance-authority";
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import {ChevronDownIcon} from "../icons/ChevronDownIcon";
import {ChevronUpIcon} from "../icons/ChevronUpIcon";
import {CloseIcon} from "../icons/CloseIcon";
import {CriticalIcon} from "../icons/CriticalIcon";
import {InfoIcon} from "../icons/InfoIcon";
import {SuccessIcon} from "../icons/SuccessIcon";
import {WarningIcon} from "../icons/WarningIcon";
import {assertNever} from "../utils/assert-never";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {IconButton} from "./IconButton";

type Status = "info" | "success" | "warning" | "critical";

const banner = cva("p-base rounded-base flex max-w-96 border", {
  variants: {
    status: {
      info: "border-info-border bg-info-background",
      success: "border-success-border bg-success-background",
      warning: "border-warning-border bg-warning-background",
      critical: "border-critical-border bg-critical-background",
    } satisfies Record<Status, string>,
  },
});

const bannerCloseButton = cva("ms-small-300 size-6 [&_svg]:size-3", {
  variants: {
    status: {
      info: "[&_svg]:stroke-info-text",
      success: "[&_svg]:stroke-success-text",
      warning: "[&_svg]:stroke-warning-text",
      critical: "[&_svg]:stroke-critical-text",
    } satisfies Record<Status, string>,
  },
});

export function Banner({
  title,
  children,
  status = "info",
  onClose,
}: {
  title: string;
  status?: Status;
  children?: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      role={status === "critical" ? "alert" : "status"}
      className={cn(
        banner({
          status,
        }),
      )}>
      <div className={cn("me-small-100 flex h-6 items-center")}>
        <BannerIcon aria-hidden status={status} />
      </div>
      <BannerDisclosure status={status} title={title}>
        {children}
      </BannerDisclosure>
      {isDefined(onClose) && (
        <IconButton
          appearance={status}
          className={cn(
            bannerCloseButton({
              status,
            }),
          )}
          onClick={onClose}>
          <CloseIcon aria-hidden />
        </IconButton>
      )}
    </div>
  );
}

const bannerIcon = cva("size-5", {
  variants: {
    status: {
      info: "stroke-info-icon",
      success: "stroke-success",
      warning: "stroke-warning",
      critical: "stroke-critical",
    } satisfies Record<Status, string>,
  },
});

interface BannerIconProps extends React.ComponentProps<"svg"> {
  status: Status;
}

function BannerIcon({status, ...props}: BannerIconProps) {
  const className = cn(
    bannerIcon({
      status,
    }),
    props.className,
  );
  switch (status) {
    case "info":
      return <InfoIcon {...props} className={className} />;
    case "success":
      return <SuccessIcon {...props} className={className} />;
    case "warning":
      return <WarningIcon {...props} className={className} />;
    case "critical":
      return <CriticalIcon {...props} className={className} />;
    default:
      assertNever(status);
  }
}

const bannerHeading = cva(
  "font-primary flex h-6 items-center text-base font-semibold [&_svg]:size-3",
  {
    variants: {
      status: {
        info: "text-info-text [&_svg]:stroke-info-text",
        success: "text-success-text [&_svg]:stroke-success-text",
        warning: "text-warning-text [&_svg]:stroke-warning-text",
        critical: "text-critical-text [&_svg]:stroke-critical-text",
      } satisfies Record<Status, string>,
    },
  },
);

const bannerButton = cva(
  [
    "rounded-base flex w-full cursor-pointer items-center justify-between text-start",
    "outline-none focus-visible:ring-2",
  ],
  {
    variants: {
      status: {
        info: "focus-visible:ring-info-border",
        success: "focus-visible:ring-success-border",
        warning: "focus-visible:ring-warning-border",
        critical: "focus-visible:ring-critical-border",
      } satisfies Record<Status, string>,
      isDisabled: {
        true: "cursor-default",
      },
    },
  },
);

const bannerDisclosurePanel = cva("font-primary text-base font-normal", {
  variants: {
    status: {
      info: "text-info-text-subdued",
      success: "text-success-text-subdued",
      warning: "text-warning-text-subdued",
      critical: "text-critical-text-subdued",
    } satisfies Record<Status, string>,
  },
});

function BannerDisclosure({
  title,
  status,
  children,
}: {
  title: string;
  status: Status;
  children?: React.ReactNode;
}) {
  return (
    <Disclosure
      isDisabled={!isDefined(children)}
      className={cn(
        "flex flex-1 flex-col justify-center",
        "expanded:gap-small-500",
      )}>
      {({isDisabled, isExpanded}) => (
        <>
          <Heading
            className={cn(
              bannerHeading({
                status,
              }),
            )}>
            <Button
              slot="trigger"
              className={cn(
                bannerButton({
                  status,
                  isDisabled,
                }),
              )}>
              {title}
              {isDisabled ? null : isExpanded ? (
                <ChevronUpIcon aria-hidden />
              ) : (
                <ChevronDownIcon aria-hidden />
              )}
            </Button>
          </Heading>
          <DisclosurePanel
            className={cn(
              bannerDisclosurePanel({
                status,
              }),
            )}>
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
