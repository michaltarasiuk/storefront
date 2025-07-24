import {cn} from "@/utils/cn";

export function MagnifyIcon(props: React.ComponentProps<"svg">) {
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
        d="M11.7784 11.7757C12.7536 10.8 13.3566 9.45233 13.3566 7.96384C13.3566 4.98562 10.9423 2.57129 7.96409 2.57129C4.98586 2.57129 2.57153 4.98562 2.57153 7.96384C2.57153 10.9421 4.98586 13.3564 7.96409 13.3564C9.45383 13.3564 10.8025 12.7523 11.7784 11.7757ZM11.7784 11.7757L16.2001 16.1999"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
