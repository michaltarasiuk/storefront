import {cn} from "#app/utils/cn";

export function CalendarIcon(props: React.ComponentProps<"svg">) {
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
        d="M5.40005 3.5998H2.70005C2.20299 3.5998 1.80005 4.00275 1.80005 4.4998V7.1998M5.40005 3.5998H12.6M5.40005 3.5998V1.7998M12.6 3.5998H15.3C15.7971 3.5998 16.2 4.00275 16.2 4.4998V7.1998M12.6 3.5998V1.7998M1.80005 7.1998V15.2998C1.80005 15.7969 2.20299 16.1998 2.70005 16.1998H6.56195H11.4381H15.3C15.7971 16.1998 16.2 15.7969 16.2 15.2998V7.1998M1.80005 7.1998H9.00005H16.2M5.01433 10.1569H5.78576M8.61433 10.1569H9.38576M12.2143 10.1569H12.9858M5.01433 13.2427H5.78576M8.61433 13.2427H9.38576M12.2143 13.2427H12.9858"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
