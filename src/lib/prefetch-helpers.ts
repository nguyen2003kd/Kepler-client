import {
  getApiV10Category,
  getGetApiV10CategoryQueryKey,
} from "@/api/endpoints/category";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchCategories(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: getGetApiV10CategoryQueryKey({ language: "vi" }),
    queryFn: ({ signal }) => getApiV10Category({ language: "vi" }, signal),
  });

  return queryClient;
}

export async function prefetchLayoutData(queryClient: QueryClient) {
  await Promise.all([prefetchCategories(queryClient)]);

  return queryClient;
}
