import type {
  TagGroupProps as AriaTagGroupProps,
  TagListProps,
  TagProps as AriaTagProps,
} from "react-aria-components";
import {
  Label,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagList,
} from "react-aria-components";

import {Text} from "./Text";
export {FieldError} from "./FieldError";

import {CloseIcon} from "@/icons/CloseIcon";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {IconButton} from "./IconButton";

interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "children" | "renderEmptyState"> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup {...props} className={cn("flex flex-col", props.className)}>
      {isDefined(label) && (
        <Label
          className={cn(
            text({
              font: "secondary",
              emphasis: "semibold",
            }),
          )}>
          {label}
        </Label>
      )}
      <TagList
        renderEmptyState={renderEmptyState}
        className={cn("gap-small-200 flex flex-wrap")}>
        {children}
      </TagList>
      {isDefined(description) && (
        <Text slot="description" appearance="subdued" size="small">
          {description}
        </Text>
      )}
      {isDefined(errorMessage) && (
        <Text
          slot="errorMessage"
          className={cn(
            "mt-small-200",
            text({
              appearance: "critical",
            }),
          )}>
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

interface TagProps extends AriaTagProps {
  icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
}

export function Tag({icon: Icon, children, ...props}: TagProps) {
  return (
    <AriaTag
      {...props}
      className={({allowsRemoving, selectionMode}) =>
        cn(
          "rounded-base ps-small-200 bg-base-background-subdued flex",
          "selected:bg-control-selected-background selected:text-base-accent",
          "focus-visible:ring-control-accent/50 focus-visible:border-control-accent outline-none focus-visible:ring-2",
          "has-focus-within:ring-control-accent/50 has-focus-within:border-control-accent has-focus-within:ring-2",
          "disabled:opacity-50",
          text(),
          {
            "pe-small-200 py-small-200": !allowsRemoving,
            "cursor-pointer": selectionMode !== "none",
          },
        )
      }>
      {({allowsRemoving, isSelected, ...renderProps}) => (
        <>
          <div className={cn("gap-small-400 flex items-center")}>
            <Icon
              aria-hidden
              className={cn({
                "stroke-control-accent": isSelected,
              })}
            />
            {typeof children === "function"
              ? children({
                  allowsRemoving,
                  isSelected,
                  ...renderProps,
                })
              : children}
          </div>
          {allowsRemoving && (
            <IconButton slot="remove" className={cn("p-small-200")}>
              <CloseIcon aria-hidden />
            </IconButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
