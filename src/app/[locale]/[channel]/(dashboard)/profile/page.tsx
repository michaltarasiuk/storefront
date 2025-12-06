import {FormattedMessage} from "#app/i18n/react-intl";
import {getIntl} from "#app/i18n/utils/get-intl";
import {cn} from "#app/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {AddAddressDialog} from "./_components/AddAddressDialog";
import {AddressCards} from "./_components/AddressCards";
import {ContactInfo} from "./_components/ContactInfo";
import {EditProfileDialog} from "./_components/EditProfileDialog";
import {Section, SectionHeader, SectionTitle} from "./_components/Section";

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/[channel]/profile">) {
  const {locale} = await params;
  const intl = await getIntl(locale);
  return (
    <>
      <PageTitle
        title={intl.formatMessage({
          id: "itPgxd",
          defaultMessage: "Profile",
        })}
      />
      <div className={cn("space-y-large-300")}>
        <Section>
          <SectionHeader>
            <SectionTitle>Kristin Watson</SectionTitle>
            <EditProfileDialog />
          </SectionHeader>
          <ContactInfo locale={locale} />
        </Section>
        <Section>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id="e6Ph5+" defaultMessage="Address" />
            </SectionTitle>
            <AddAddressDialog />
          </SectionHeader>
          <AddressCards />
        </Section>
      </div>
    </>
  );
}
