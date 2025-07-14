import {cn} from "../utils/cn";

export function ClockIcon(props: React.ComponentProps<"svg">) {
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
        d="M9.00002 5.39987V8.81347C9.00002 8.93282 9.04743 9.04728 9.13182 9.13167L10.9286 10.9284M16.2 8.9998C16.2 12.9763 12.9765 16.1998 9.00005 16.1998C5.0236 16.1998 1.80005 12.9763 1.80005 8.9998C1.80005 5.02335 5.0236 1.7998 9.00005 1.7998C12.9765 1.7998 16.2 5.02335 16.2 8.9998Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
