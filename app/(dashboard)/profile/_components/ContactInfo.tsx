import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

export function ContactInfo() {
  return (
    <dl
      className={cn(
        "gap-x-large-400 gap-y-large-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
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
