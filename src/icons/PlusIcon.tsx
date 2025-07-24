import {cn} from "../utils/cn";

export function PlusIcon(props: React.ComponentProps<"svg">) {
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
        d="M2.69995 9.0002L8.99995 9.0002M8.99995 9.0002H15.3M8.99995 9.0002L8.99995 2.7002M8.99995 9.0002L8.99995 15.3002"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
