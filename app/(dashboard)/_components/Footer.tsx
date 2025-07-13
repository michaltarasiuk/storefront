import {Link} from "@/shared/components/Link";
import {cn} from "@/shared/utils/cn";

export function Footer() {
  return (
    <footer
      className={cn(
        "py-large-200 mx-auto max-w-6xl",
        "border-base-border border-t",
      )}>
      <ul
        className={cn(
          "gap-base sm:gap-large-200 flex flex-col items-center sm:flex-row sm:items-start",
        )}>
        <li>
          <Link>Refund Policy</Link>
        </li>
        <li>
          <Link>Shipping Policy</Link>
        </li>
        <li>
          <Link>Privacy Policy</Link>
        </li>
        <li>
          <Link>Terms of Service</Link>
        </li>
      </ul>
    </footer>
  );
}
