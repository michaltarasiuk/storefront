import {Button} from "@/components/Button";
import {Heading, HeadingGroup} from "@/components/Heading";
import {TextBlock} from "@/components/TextBlock";
import type {Locale} from "@/i18n/consts";
import {FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {LockIcon} from "@/icons/LockIcon";
import {cn} from "@/utils/cn";

import {PageTitle} from "../_components/PageTitie";

interface SettingsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function SettingsPage({params}: SettingsPageProps) {
  const {locale} = await params;
  const intl = await getIntl(locale);
  return (
    <>
      <PageTitle
        title={intl.formatMessage({
          id: "D3idYv",
          defaultMessage: "Settings",
        })}
      />
      <HeadingGroup>
        <section
          className={cn(
            "sm:gap-large-400 gap-large-200 grid sm:grid-cols-[1fr_2fr]",
          )}>
          <header className={cn("gap-base flex flex-col justify-center")}>
            <div className={cn("gap-small-300 flex items-center")}>
              <LockIcon aria-hidden />
              <Heading>
                <FormattedMessage
                  id="s3O2Si"
                  defaultMessage="Log out everywhere"
                />
              </Heading>
            </div>
            <TextBlock appearance="subdued">
              <FormattedMessage
                id="ePjUFH"
                defaultMessage="If you've lost a device or have security concerns, log out everywhere to ensure the security of your account."
              />
            </TextBlock>
          </header>
          <aside
            className={cn(
              "bg-base-background gap-base flex flex-col rounded-lg p-6",
              "md:flex-row md:items-center",
            )}>
            <Button kind="secondary">
              <FormattedMessage
                id="s3O2Si"
                defaultMessage="Log out everywhere"
              />
            </Button>
            <TextBlock appearance="subdued">
              <FormattedMessage
                id="TVieNi"
                defaultMessage="You will be logged out on this device as well."
              />
            </TextBlock>
          </aside>
        </section>
      </HeadingGroup>
    </>
  );
}
