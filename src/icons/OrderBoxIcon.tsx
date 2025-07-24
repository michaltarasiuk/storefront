import {cn} from "../utils/cn";

export function OrderBoxIcon(props: React.ComponentProps<"svg">) {
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
        d="M16.2 5.39662L14.5654 2.96714C14.4531 2.80027 14.2651 2.7002 14.064 2.7002H9.00005M16.2 5.39662H9.00005M16.2 5.39662V14.6959C16.2 15.0296 15.9295 15.3002 15.5958 15.3002H2.40433C2.0706 15.3002 1.80005 15.0296 1.80005 14.6959V5.39662M1.80005 5.39662L3.43472 2.96714C3.547 2.80027 3.73495 2.7002 3.93608 2.7002H9.00005M1.80005 5.39662H9.00005M9.00005 5.39662V2.7002"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
