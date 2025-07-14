import {TextField} from "@/components/TextField";
import {cn} from "@/utils/cn";

export function FullNameFieldset() {
  return (
    <fieldset className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
      <legend className={cn("sr-only")}>Full Name</legend>
      <TextField
        name="firstName"
        label="First name"
        autoComplete="given-name"
      />
      <TextField name="lastName" label="Last name" autoComplete="family-name" />
    </fieldset>
  );
}

export function AddressFieldset() {
  return (
    <fieldset className={cn("space-y-base")}>
      <legend className={cn("sr-only")}>Address Information</legend>
      <FullNameFieldset />
      <TextField name="address" label="Address" autoComplete="street-address" />
      <TextField
        name="apartment"
        label="Apartment, suite, etc (optional)"
        autoComplete="address-line2"
      />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="postalCode"
          label="Postal code"
          autoComplete="postal-code"
        />
        <TextField name="city" label="City" autoComplete="address-level2" />
      </div>
    </fieldset>
  );
}
