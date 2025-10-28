import {cva} from "cva";
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import {text} from "@/styles/text";

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

export function Banner({
  status,
  title,
  description,
  onClose,
}: {
  status: Status;
  title: string;
  description?: string;
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
      <Disclosure
        isDisabled={!isDefined(description)}
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
              {description}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      {isDefined(onClose) && (
        <IconButton
          appearance={status}
          className={cn(
            bannerCloseButton({
              status,
            }),
          )}
          onPress={onClose}>
          <CloseIcon aria-hidden />
        </IconButton>
      )}
    </div>
  );
}

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

const bannerHeading = cva(
  [
    "flex h-6 items-center [&_svg]:size-3",
    text({
      emphasis: "semibold",
    }),
  ],
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

const bannerDisclosurePanel = cva(text(), {
  variants: {
    status: {
      info: "text-info-text-subdued",
      success: "text-success-text-subdued",
      warning: "text-warning-text-subdued",
      critical: "text-critical-text-subdued",
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
