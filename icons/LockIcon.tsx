import {cn} from "../utils/cn";

export function LockIcon(props: React.ComponentProps<"svg">) {
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
        d="M4.49995 8.0998C4.49995 5.1454 5.95442 1.7998 8.99996 1.7998C12.0455 1.7998 13.5 5.1454 13.5 8.0998M2.69995 8.70409V15.5955C2.69995 15.9293 2.9705 16.1998 3.30424 16.1998H14.6957C15.0294 16.1998 15.3 15.9293 15.3 15.5955V8.70409C15.3 8.37035 15.0294 8.0998 14.6957 8.0998H3.30424C2.9705 8.0998 2.69995 8.37035 2.69995 8.70409Z"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
