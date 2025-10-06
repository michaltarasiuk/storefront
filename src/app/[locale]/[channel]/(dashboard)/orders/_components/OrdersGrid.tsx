import {cn} from "@/utils/cn";

import {OrderCard, SkeletonOrderCard} from "./OrderCard";

export function OrdersGrid() {
  return (
    <ul className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
      <li>
        <OrderCard />
      </li>
      <li>
        <OrderCard />
      </li>
      <li>
        <OrderCard />
      </li>
    </ul>
  );
}

export function OrdersGridSkeleton() {
  return (
    <div className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
      <div>
        <SkeletonOrderCard />
      </div>
      <div>
        <SkeletonOrderCard />
      </div>
      <div>
        <SkeletonOrderCard />
      </div>
    </div>
  );
}
