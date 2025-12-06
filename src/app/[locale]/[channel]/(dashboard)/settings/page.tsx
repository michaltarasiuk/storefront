import {Heading, HeadingGroup} from "#app/components/Heading";
import {TextBlock} from "#app/components/TextBlock";
import {FormattedMessage} from "#app/i18n/react-intl";
import {getIntl} from "#app/i18n/utils/get-intl";
import {LockIcon} from "#app/icons/LockIcon";
import {cn} from "#app/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {DeactivateAllTokensButton} from "./_components/DeactivateAllTokensButton";

export default async function SettingsPage({
  params,
}: PageProps<"/[locale]/[channel]/settings">) {
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
            <DeactivateAllTokensButton />
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
