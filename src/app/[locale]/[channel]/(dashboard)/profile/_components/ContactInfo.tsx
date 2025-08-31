import type {Locale} from "@/i18n/consts";
import {getIntl} from "@/i18n/utils/get-intl";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

export async function ContactInfo({locale}: {locale: Locale}) {
  const intl = await getIntl(locale);
  return (
    <dl
      className={cn(
        "gap-x-large-400 gap-y-large-200 grid grid-cols-1",
        "md:grid-cols-2 lg:grid-cols-4",
      )}>
      <ContactField
        label={intl.formatMessage({
          id: "sy+pv5",
          defaultMessage: "Email",
        })}
        value="a.stuart@leafygardens.com"
      />
      <ContactField
        label={intl.formatMessage({
          id: "jdJhOL",
          defaultMessage: "Phone number",
        })}
        value="+1 416 123 4567"
      />
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
