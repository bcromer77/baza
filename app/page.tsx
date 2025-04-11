import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-gray-200 p-10">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
