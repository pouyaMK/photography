
import { Suspense } from "react";
import CategoryContent from "./CategoryContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-8">در حال بارگذاری...</div>}>
      <CategoryContent />
    </Suspense>
  );
}






