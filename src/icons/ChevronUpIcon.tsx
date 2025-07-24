import {cn} from "../utils/cn";

export function ChevronUpIcon(props: React.ComponentProps<"svg">) {
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
        d="M2.70005 10.7998L8.68185 4.818C8.85759 4.64227 9.14251 4.64227 9.31825 4.818L15.3 10.7998"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
