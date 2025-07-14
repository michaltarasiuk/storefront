import Image from "next/image";

import {Routes} from "../consts/routes";
import {Link} from "./Link";

export function LogoLink() {
  return (
    <Link href={Routes.home} aria-label="Go to homepage">
      <Image
        src="/logo.png"
        alt="Company Logo"
        width={112}
        height={36}
        priority
      />
    </Link>
  );
}
