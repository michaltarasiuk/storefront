import {cva} from "class-variance-authority";

export const text = cva(null, {
  variants: {
    font: {
      primary: "font-primary",
      secondary: "font-secondary",
    },
    appearance: {
      base: "text-base-text",
      accent: "text-base-accent",
      subdued: "text-base-text-subdued",
      contrast: "text-base-text-contrast",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      critical: "text-critical",
      decorative: "text-base-decorative",
      control: "text-control-text",
    },
    emphasis: {
      base: "font-normal",
      italic: "italic",
      semibold: "font-semibold",
    },
    size: {
      extraSmall: "text-extra-small",
      small: "text-small",
      base: "text-base",
      medium: "text-medium",
      large: "text-large",
      extraLarge: "text-extra-large",
    },
  },
  defaultVariants: {
    font: "primary",
    appearance: "base",
    emphasis: "base",
    size: "base",
  },
});
