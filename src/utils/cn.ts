import {type ClassValue, clsx} from "clsx";
import {extendTailwindMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-extra-large",
        "text-large",
        "text-medium",
        "text-base",
        "text-small",
        "text-extra-small",
      ],
    },
  },
});
