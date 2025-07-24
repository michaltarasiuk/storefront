import {cn} from "@/utils/cn";

import {OrderCard, SkeletonOrderCard} from "./OrderCard";

export function OrdersGrid() {
  return (
    <OrdersList>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <li key={i}>
            <OrderCard />
          </li>
        ))}
    </OrdersList>
  );
}

export function OrdersGridSkeleton() {
  return (
    <OrdersList>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <li key={i}>
            <SkeletonOrderCard />
          </li>
        ))}
    </OrdersList>
  );
}

function OrdersList({children}: {children: React.ReactNode}) {
  return (
    <ul className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
      {children}
    </ul>
  );
}
