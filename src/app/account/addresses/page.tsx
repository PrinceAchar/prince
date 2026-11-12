"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddressesPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/account/unified/addresses");
  }, [router]);
  
  return null;
}