import {cn} from "../utils/cn";

export function WarningIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
      className={cn("stroke-success-icon shrink-0", props.className)}>
      <path d="M9 7.19922L9 9.89922" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9.00006" cy="12.6009" r="0.257143" strokeWidth="1.4" />
      <path
        d="M9.00283 12.5977H8.99683V12.6041H9.00283V12.5977Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.46685 2.80052C8.69435 2.37396 9.30575 2.37396 9.53324 2.80052L15.7261 14.4121C15.9408 14.8146 15.6491 15.3008 15.1929 15.3008H2.80719C2.351 15.3008 2.05932 14.8146 2.274 14.4121L8.46685 2.80052Z"
        strokeWidth="1.4"
      />
    </svg>
  );
}
