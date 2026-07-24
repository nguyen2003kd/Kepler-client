import { Suspense } from "react";
import ListingPage from "@/components/listing-page";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListingPage mode="sale" />
    </Suspense>
  );
}
