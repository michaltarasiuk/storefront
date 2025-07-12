import {text} from "@/shared/styles/text";
import {cn} from "@/shared/utils/cn";

export function ContactInfo() {
  return (
    <dl
      className={cn(
        "gap-x-large-400 gap-y-large-200 flex flex-col flex-wrap md:flex-row",
      )}>
      <ContactField label="Email" value="a.stuart@leafygardens.com" />
      <ContactField label="Phone number" value="+1 416 123 4567" />
    </dl>
  );
}

function ContactField({label, value}: {label: string; value: string}) {
  return (
    <div>
      <dt
        className={cn(
          text({
            appearance: "subdued",
          }),
        )}>
        {label}
      </dt>
      <dd className={cn(text())}>{value}</dd>
    </div>
  );
}
