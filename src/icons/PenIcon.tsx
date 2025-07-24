import {cn} from "../utils/cn";

export function PenIcon(props: React.ComponentProps<"svg">) {
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
        d="M11.6963 4.14785L13.4885 2.3557C13.7245 2.11971 14.1071 2.11971 14.3431 2.3557L15.7663 3.77897C16.0023 4.01495 16.0023 4.39757 15.7663 4.63355L13.9742 6.4257M11.6963 4.14785L13.9742 6.4257M11.6963 4.14785L5.19337 10.6508M13.9742 6.4257L7.47122 12.9287M5.19337 10.6508L4.20611 11.6381C4.14917 11.695 4.10418 11.7628 4.0738 11.8373L2.55322 15.5688L6.28471 14.0482C6.35928 14.0178 6.42702 13.9729 6.48396 13.9159L7.47122 12.9287M5.19337 10.6508L7.47122 12.9287"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
