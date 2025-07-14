import {cn} from "../utils/cn";

export function CloseIcon(props: React.ComponentProps<"svg">) {
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
        d="M3.6001 3.60059L9.0001 9.00059M14.4001 14.4006L9.0001 9.00059M9.0001 9.00059L14.4001 3.60059M9.0001 9.00059L3.6001 14.4006"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
