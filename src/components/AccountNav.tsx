"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/account", label: "Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 mb-8 overflow-x-auto">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-[1px] rounded-lg transition-colors whitespace-nowrap ${
              active
                ? "bg-[#C21A33] text-white"
                : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
