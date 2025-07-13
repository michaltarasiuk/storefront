import {Suspense} from "react";

import {cn} from "@/shared/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {OrdersFilterSortSheet} from "./_components/OrdersFilterSortSheet";
import {OrderStatusTabs} from "./_components/OrderStatusTabs";
import {OrdersView, OrdersViewSkeleton} from "./_components/OrdersView";
import {OrderViewProvider} from "./_components/OrderViewProvider";
import {OrderViewToggle} from "./_components/OrderViewToggle";

export default function OrdersPage() {
  return (
    <OrderViewProvider>
      <PageTitle title="Orders">
        <div className={cn("gap-base flex items-center")}>
          <OrdersFilterSortSheet />
          <div className={cn("hidden sm:block")}>
            <OrderViewToggle />
          </div>
        </div>
      </PageTitle>
      <div className={cn("bg-base-background rounded-large mb-6 p-5")}>
        <OrderStatusTabs />
      </div>
      <div>
        <Suspense fallback={<OrdersViewSkeleton />}>
          <OrdersView />
        </Suspense>
      </div>
    </OrderViewProvider>
  );
}
