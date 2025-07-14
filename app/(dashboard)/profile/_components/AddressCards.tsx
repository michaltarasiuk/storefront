import {Text} from "@/components/Text";
import {PenIcon} from "@/icons/PenIcon";
import {cn} from "@/utils/cn";

import {EditAddressDialog} from "./EditAddressDialog";

export function AddressCards() {
  return (
    <ul
      className={cn(
        "gap-x-large-400 gap-y-large-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      )}>
      {Addresses.map((address, i) => (
        <li key={i}>
          <EditAddressDialog>
            <AddressCard {...address} />
          </EditAddressDialog>
        </li>
      ))}
    </ul>
  );
}

interface AddressCardProps {
  fullname: string;
  address: string[];
  isShipping?: boolean;
  isBilling?: boolean;
}

function AddressCard({
  fullname,
  address,
  isShipping,
  isBilling,
}: AddressCardProps) {
  const title = isShipping
    ? "Shipping Address"
    : isBilling
      ? "Billing Address"
      : fullname;
  const addressLines = title !== fullname ? [fullname, ...address] : address;
  return (
    <article
      className={cn("gap-small-200 grid grid-cols-[1fr_auto] items-center")}>
      <Text appearance="subdued" className="text-start">
        {title}
      </Text>
      <PenIcon aria-hidden />
      <div className={cn("flex flex-col items-start")}>
        {addressLines.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </div>
    </article>
  );
}

const Addresses = [
  {
    fullname: "Alain Stuart",
    address: ["151 O'Connor St", "Ottawa ON K2P 2L8", "Canada"],
    isShipping: true,
  },
  {
    fullname: "Alain Stuart",
    address: ["151 O'Connor St", "Ottawa ON K2P 2L8", "Canada"],
    isBilling: true,
  },
];
