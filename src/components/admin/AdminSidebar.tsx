"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import NavSection from "./NavSection";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

interface NavSectionType {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  navigationSections: NavSectionType[];
  isAdmin: boolean;
}

function SidebarContent({
  navigationSections,
  isAdmin,
  onNavigate,
}: {
  navigationSections: NavSectionType[];
  isAdmin: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {navigationSections.map((section) => {
        if (section.adminOnly && !isAdmin) return null;

        return (
          <NavSection
            key={section.title}
            title={section.title}
            items={section.items}
            isAdmin={isAdmin}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({
  isMobileOpen,
  onMobileClose,
  navigationSections,
  isAdmin,
}: AdminSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-16 w-64 bg-white border-r h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-4">
          <SidebarContent
            navigationSections={navigationSections}
            isAdmin={isAdmin}
          />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle className="text-left">Цэс</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <SidebarContent
              navigationSections={navigationSections}
              isAdmin={isAdmin}
              onNavigate={onMobileClose}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
