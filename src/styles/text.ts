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
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      critical: "text-critical",
      decorative: "text-base-decorative",
    },
    emphasis: {
      base: "font-normal",
      italic: "italic",
      semibold: "font-semibold",
    },
    size: {
      extrasmall: "text-extra-small",
      small: "text-small",
      base: "text-base",
      medium: "text-medium",
      large: "text-large",
      extralarge: "text-extra-large",
    },
  },
  defaultVariants: {
    font: "primary",
    appearance: "base",
    emphasis: "base",
    size: "base",
  },
});
