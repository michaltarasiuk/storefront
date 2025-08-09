import {cn} from "@/utils/cn";

export function DiscountIcon(props: React.ComponentProps<"svg">) {
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
        d="M9.36531 1.80273L15.7474 1.80273C15.996 1.80273 16.1974 2.00421 16.1974 2.25273L16.1974 8.63485C16.1974 8.87355 16.1026 9.10246 15.9338 9.27125L9.62891 15.5762C9.27744 15.9276 8.70759 15.9276 8.35612 15.5762L2.424 9.64404C2.07253 9.29257 2.07253 8.72272 2.424 8.37125L8.72891 2.06634C8.8977 1.89756 9.12661 1.80273 9.36531 1.80273Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5999 6.30028C12.5999 6.79734 12.1969 7.20028 11.6999 7.20028C11.2028 7.20028 10.7999 6.79734 10.7999 6.30028C10.7999 5.80322 11.2028 5.40028 11.6999 5.40028C12.1969 5.40028 12.5999 5.80322 12.5999 6.30028Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7027 6.29707H11.6967V6.30349H11.7027V6.29707Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
