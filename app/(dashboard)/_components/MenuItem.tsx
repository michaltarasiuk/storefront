"use client";

import {usePathname} from "next/navigation";
import {Link} from "react-aria-components";

import {cn} from "@/shared/utils/cn";

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
}

export function MenuItem({href, children}: MenuItemProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "py-base px-small-200 rounded-base text-base-text",
        "hover:bg-base-background-subdued",
        "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2",
        href === pathname && "underline underline-offset-2",
      )}>
      {children}
    </Link>
  );
}
