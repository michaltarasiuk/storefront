import {cn} from "../utils/cn";

export function ListIcon(props: React.ComponentProps<"svg">) {
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
        d="M6.30005 9H15.3M6.30005 4.5H15.3M6.30005 13.5H15.3"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.70595 4.5H2.69995V4.50643H2.70595V4.5Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.70595 9H2.69995V9.00643H2.70595V9Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.70595 13.5H2.69995V13.5064H2.70595V13.5Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="2.7001" cy="4.49967" r="0.128571" strokeWidth="1.4" />
      <circle cx="2.7001" cy="8.99967" r="0.128571" strokeWidth="1.4" />
      <circle cx="2.7001" cy="13.4997" r="0.128571" strokeWidth="1.4" />
    </svg>
  );
}
