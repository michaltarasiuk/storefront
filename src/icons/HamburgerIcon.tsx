import {cn} from "../utils/cn";

export function HamburgerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
      className={cn("stroke-base-icon shrink-0", props.className)}>
      <path
        d="M3.6001 9H14.4001M3.6001 13.5H14.4001M3.6001 4.5H14.4001"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
