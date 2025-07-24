import {cn} from "../utils/cn";

export function ProfileIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      {...props}
      className={cn("stroke-base-icon shrink-0", props.className)}>
      <path
        d="M4.94026 20.1946C7.01739 18.3705 9.86218 17.2458 13.0001 17.2458C16.138 17.2458 18.9828 18.3705 21.0599 20.1946M24.3232 12.9997C24.3232 19.2533 19.2536 24.3228 13.0001 24.3228C6.74652 24.3228 1.677 19.2533 1.677 12.9997C1.677 6.74613 6.74652 1.67661 13.0001 1.67661C19.2536 1.67661 24.3232 6.74613 24.3232 12.9997ZM15.8308 10.1689C15.8308 11.7323 14.5635 12.9997 13.0001 12.9997C11.4367 12.9997 10.1693 11.7323 10.1693 10.1689C10.1693 8.60553 11.4367 7.33815 13.0001 7.33815C14.5635 7.33815 15.8308 8.60553 15.8308 10.1689Z"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
