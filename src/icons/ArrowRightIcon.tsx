import {cn} from "#app/utils/cn";

export function ArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn("stroke-base-icon shrink-0", props.className)}>
      <path
        d="M1.80005 8.9998H16.2M16.2 8.9998L9.90005 2.6998M16.2 8.9998L9.90005 15.2998"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
