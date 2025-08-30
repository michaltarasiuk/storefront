import {cn} from "@/utils/cn";

export function QuestionIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
      className={cn("stroke-base-icon shrink-0", props.className)}>
      <circle cx="8.9998" cy="9.00078" r="7.2" strokeWidth="1.4" />
      <path
        d="M7.19995 6.55825C7.45709 4.88683 10.5428 4.88683 10.8 6.55826C11.0571 8.22968 8.93567 8.22969 8.93567 9.57969"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.006 12.5996H9V12.606H9.006V12.5996Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.99991" cy="12.4723" r="0.128571" strokeWidth="1.4" />
    </svg>
  );
}
