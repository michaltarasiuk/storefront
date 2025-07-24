import {FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {cn} from "@/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {AddAddressDialog} from "./_components/AddAddressDialog";
import {AddressCards} from "./_components/AddressCards";
import {Card, CardHeader, CardTitle} from "./_components/Card";
import {ContactInfo} from "./_components/ContactInfo";
import {EditProfileDialog} from "./_components/EditProfileDialog";

export default async function ProfilePage() {
  const intl = await getIntl();
  return (
    <>
      <PageTitle
        title={intl.formatMessage({
          id: "itPgxd",
          defaultMessage: "Profile",
        })}
      />
      <div className={cn("space-y-large-300")}>
        <Card>
          <CardHeader>
            <CardTitle>Kristin Watson</CardTitle>
            <EditProfileDialog />
          </CardHeader>
          <ContactInfo />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <FormattedMessage id="e6Ph5+" defaultMessage="Address" />
            </CardTitle>
            <AddAddressDialog />
          </CardHeader>
          <AddressCards />
        </Card>
      </div>
    </>
  );
}
