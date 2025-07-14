import {Button} from "@/components/Button";
import {Heading, HeadingGroup} from "@/components/Heading";
import {TextBlock} from "@/components/Text";
import {LockIcon} from "@/icons/LockIcon";
import {cn} from "@/utils/cn";

import {PageTitle} from "../_components/PageTitie";

export default function SettingsPage() {
  return (
    <>
      <PageTitle title="Settings" />
      <HeadingGroup>
        <section className={cn("grid gap-6 sm:grid-cols-[1fr_2fr] sm:gap-8")}>
          <header className={cn("flex flex-col justify-center gap-4")}>
            <div className={cn("flex items-center gap-2")}>
              <LockIcon aria-hidden />
              <Heading>Log out everywhere</Heading>
            </div>
            <TextBlock appearance="subdued">
              If you’ve lost a device or have security concerns, log out
              everywhere to ensure the security of your account.
            </TextBlock>
          </header>
          <aside
            className={cn(
              "flex flex-col gap-4 md:flex-row md:items-center",
              "bg-base-background rounded-lg p-6",
            )}>
            <Button kind="secondary" type="button">
              Log out everywhere
            </Button>
            <TextBlock appearance="subdued">
              You will be logged out on this device as well.
            </TextBlock>
          </aside>
        </section>
      </HeadingGroup>
    </>
  );
}
