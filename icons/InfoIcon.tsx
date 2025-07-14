import {cn} from "../utils/cn";

export function InfoIcon(props: React.ComponentProps<"svg">) {
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
        d="M9.00005 12.9998V9.12838C9.00005 9.05737 8.94249 8.9998 8.87148 8.9998H8.00005M16.2 8.9998C16.2 12.9763 12.9765 16.1998 9.00005 16.1998C5.0236 16.1998 1.80005 12.9763 1.80005 8.9998C1.80005 5.02335 5.0236 1.7998 9.00005 1.7998C12.9765 1.7998 16.2 5.02335 16.2 8.9998ZM9.51433 5.3998C9.51433 5.68384 9.28408 5.91409 9.00005 5.91409C8.71602 5.91409 8.48576 5.68384 8.48576 5.3998C8.48576 5.11577 8.71602 4.88552 9.00005 4.88552C9.28408 4.88552 9.51433 5.11577 9.51433 5.3998ZM8.99683 5.39659H9.00284V5.40302H8.99683V5.39659Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
