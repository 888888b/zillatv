import HomePage from "@/components/templates/homePage"
import { SuspenseLoading } from "@/components/molecules/suspenseLoading";

import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={<SuspenseLoading/>}>
      <HomePage/>
    </Suspense>
  );
}
