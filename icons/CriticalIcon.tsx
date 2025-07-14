import {cn} from "../utils/cn";

export function CriticalIcon(props: React.ComponentProps<"svg">) {
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
        d="M9.00005 5.2498L9.00005 8.7498M16.2 8.9998C16.2 12.9763 12.9765 16.1998 9.00005 16.1998C5.0236 16.1998 1.80005 12.9763 1.80005 8.9998C1.80005 5.02335 5.0236 1.7998 9.00005 1.7998C12.9765 1.7998 16.2 5.02335 16.2 8.9998ZM9.25719 12.5998C9.25719 12.7418 9.14206 12.8569 9.00005 12.8569C8.85803 12.8569 8.74291 12.7418 8.74291 12.5998C8.74291 12.4578 8.85803 12.3427 9.00005 12.3427C9.14206 12.3427 9.25719 12.4578 9.25719 12.5998ZM8.99683 12.5966H9.00284V12.603H8.99683V12.5966Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
