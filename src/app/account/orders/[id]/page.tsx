"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  useEffect(() => {
    router.replace(`/account/unified/orders/${orderId}`);
  }, [router, orderId]);
  
  return null;
}