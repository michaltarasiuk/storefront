import {cn} from "#app/utils/cn";

export function ChevronLeftIcon(props: React.ComponentProps<"svg">) {
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
        d="M10.8 15.3002L4.81825 9.31839C4.64251 9.14266 4.64251 8.85773 4.81825 8.682L10.8 2.7002"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
