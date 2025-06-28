import Image from "next/image";

import {Routes} from "../consts/routes";
import {Link} from "./Link";

export function LogoLink(props: {className?: string}) {
  return (
    <Link href={Routes.home} aria-label="Go to homepage" {...props}>
      <Image src="/logo.png" alt="" width={112} height={35} />
    </Link>
  );
}
