import { cache } from "react";
import { notFound } from "next/navigation";
import {
  getApiV10Property,
  getApiV10PropertyId,
} from "@/api/endpoints/property";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { marketplaceGroups } from "@/lib/property-display";
import baseConfig from "@/configs/base";
import MarketplaceView from "./marketplace-view";
const legacy: Record<string, string> = {
  "/san-giao-dich/mua-ban-nha-le": "SALE",
  "/san-giao-dich/thue-va-cho-thue": "RENT",
  "/san-giao-dich/du-an-phan-phoi": "DISTRIBUTION",
  "/san-giao-dich/keu-goi-dau-tu": "INVESTMENT",
  "/san-giao-dich/du-an-can-ma": "MA",
};
const getGroups = cache(async () => {
  let categories: CategoryWithChildren[] = [];
  try {
    const response = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/category?language=vi`,
      { cache: "no-store" },
    );
    const data = await response.json();
    categories =
      data.responseData?.find(
        (c: CategoryWithChildren) => c.link === "/san-giao-dich",
      )?.categories || [];
  } catch {}
  return marketplaceGroups.map((group) => ({
    ...group,
    link: categories.find((c) => c.code === group.code)?.link || group.link,
    description:
      categories.find((c) => c.code === group.code)?.description || "",
  }));
});
export async function resolveMarketplacePage(
  path: string,
  requestedPage?: string,
) {
  const pathname = "/" + path.replace(/^\/+|\/+$/g, "");
  const known =
    pathname.startsWith("/san-giao-dich") ||
    marketplaceGroups.some(
      (group) =>
        pathname === group.link || pathname.startsWith(group.link + "/"),
    );
  // Custom links set in CMS are resolved below; unrelated routes fall through.
  const groups = await getGroups();
  const group =
    groups.find((g) => pathname === g.link || legacy[pathname] === g.value) ||
    (pathname === "/san-giao-dich" ? groups[0] : undefined);
  const itemId = pathname.startsWith("/san-giao-dich/san-pham/")
    ? pathname.slice("/san-giao-dich/san-pham/".length)
    : null;
  if (itemId) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        itemId,
      )
    )
      notFound();
    try {
      const result = await getApiV10PropertyId(itemId);
      const property = result.responseData;
      if (!property) notFound();
      return (
        <MarketplaceView
          key={property.id}
          groups={groups}
          group={
            groups.find((g) => g.value === property.transaction_group) ||
            groups[0]
          }
          property={property}
          products={[]}
          total={0}
          page={1}
        />
      );
    } catch (error) {
      if ((error as { status?: number })?.status === 404) notFound();
      throw error;
    }
  }
  if (!group) {
    if (known && pathname.startsWith("/san-giao-dich")) notFound();
    return null;
  }
  const page = Math.max(1, Number.parseInt(requestedPage || "1", 10) || 1);
  try {
    const result = await getApiV10Property({
      filters: `transaction_group==${group.value}`,
      page,
      pageSize: 12,
    });
    return (
      <MarketplaceView
        groups={groups}
        group={group}
        products={result.responseData?.rows || []}
        total={result.responseData?.count || 0}
        page={page}
      />
    );
  } catch {
    return (
      <MarketplaceView
        groups={groups}
        group={group}
        products={[]}
        total={0}
        page={page}
        loadError
      />
    );
  }
}
