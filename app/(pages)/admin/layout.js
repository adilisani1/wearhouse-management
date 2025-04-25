"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, []);

  return (
    <Suspense>
      <div>{children}</div>;
    </Suspense>
  );
}
