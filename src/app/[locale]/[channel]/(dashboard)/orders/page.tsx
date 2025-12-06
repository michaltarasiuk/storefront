import {Suspense} from "react";

import {getIntl} from "#app/i18n/utils/get-intl";
import {cn} from "#app/utils/cn";

import {PageTitle} from "../_components/PageTitie";
import {OrdersFilterSortSheet} from "./_components/OrdersFilterSortSheet";
import {OrderStatusTabs} from "./_components/OrderStatusTabs";
import {OrdersView, SkeletonOrdersView} from "./_components/OrdersView";
import {OrderViewProvider} from "./_components/OrderViewProvider";
import {OrderViewToggle} from "./_components/OrderViewToggle";

export default async function OrdersPage({
  params,
}: PageProps<"/[locale]/[channel]/orders">) {
  const {locale} = await params;
  const intl = await getIntl(locale);
  return (
    <OrderViewProvider>
      <PageTitle
        title={intl.formatMessage({
          id: "X7jl6w",
          defaultMessage: "Orders",
        })}>
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
      <Suspense fallback={<SkeletonOrdersView />}>
        <OrdersView />
      </Suspense>
    </OrderViewProvider>
  );
}
