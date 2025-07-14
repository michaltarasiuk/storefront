import {cn} from "../utils/cn";

export function SuccessIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
      className={cn("stroke-success-icon shrink-0", props.className)}>
      <path
        d="M12.2143 6.6865L8.88918 11.6909C8.7092 11.9617 8.32614 11.9996 8.09657 11.7693L5.78576 9.45078M16.2 9.00078C16.2 12.9772 12.9765 16.2008 9.00005 16.2008C5.0236 16.2008 1.80005 12.9772 1.80005 9.00078C1.80005 5.02433 5.0236 1.80078 9.00005 1.80078C12.9765 1.80078 16.2 5.02433 16.2 9.00078Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
