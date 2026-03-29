"use client";

import NavItem from "./NavItem";

interface NavItemData {
  name: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

interface NavSectionProps {
  title: string;
  items: NavItemData[];
  isAdmin: boolean;
  onNavigate?: () => void;
}

export default function NavSection({
  title,
  items,
  isAdmin,
  onNavigate,
}: NavSectionProps) {
  const visibleItems = items.filter((item) => !item.adminOnly || isAdmin);

  if (visibleItems.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="px-3 mb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-1">
        {visibleItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            href={item.href}
            icon={item.icon}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </div>
  );
}
