import {cn} from "../utils/cn";

export function ArrowLeft(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn("stroke-base-icon shrink-0", props.className)}>
      <path
        d="M16.2 9.0002H1.79995M1.79995 9.0002L8.09995 15.3002M1.79995 9.0002L8.09995 2.7002"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
