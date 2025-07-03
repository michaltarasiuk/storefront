import {cn} from "@/shared/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {OrderStatusTabs} from "./_components/OrderStatusTabs";
import {OrdersView} from "./_components/OrdersView";
import {OrderViewProvider} from "./_components/OrderViewProvider";
import {OrderViewToggle} from "./_components/OrderViewToggle";

export default function OrdersPage() {
  return (
    <OrderViewProvider>
      <PageTitle title="Orders">
        <div className={cn("hidden sm:block")}>
          <OrderViewToggle />
        </div>
      </PageTitle>
      <div className={cn("bg-base-background rounded-large mb-6 p-5")}>
        <OrderStatusTabs />
      </div>
      <div className={cn("mb-9")}>
        <OrdersView />
      </div>
    </OrderViewProvider>
  );
}
