import {cn} from "@/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {AddAddressDialog} from "./_components/AddAddressDialog";
import {AddressCards} from "./_components/AddressCards";
import {Card, CardHeader, CardTitle} from "./_components/Card";
import {ContactInfo} from "./_components/ContactInfo";
import {EditProfileDialog} from "./_components/EditProfileDialog";

export default function ProfilePage() {
  return (
    <>
      <PageTitle title="Profile" />
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
            <CardTitle>Address</CardTitle>
            <AddAddressDialog />
          </CardHeader>
          <AddressCards />
        </Card>
      </div>
    </>
  );
}
