"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  name: string;
  href: string;
  icon: string;
  onNavigate?: () => void;
}

export default function NavItem({
  name,
  href,
  icon,
  onNavigate,
}: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
    onNavigate?.();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-red-50 text-red-700 shadow-sm"
            : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
        )}
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </button>
    </li>
  );
}
