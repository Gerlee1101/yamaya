"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, LogOut } from "lucide-react";

interface AdminHeaderProps {
  userName?: string;
  userRole?: "admin" | "manager";
  onMenuClick: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  userName,
  userRole,
  onMenuClick,
  onLogout,
}: AdminHeaderProps) {
  const roleLabel = userRole === "admin" ? "Админ" : "Менежер";
  const initials =
    userName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="border-b sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Image
              src="/logo.png"
              alt="Yamaya Trade"
              width={160}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center gap-3">
            {userName && (
              <>
                <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50/50 border border-gray-100">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-gray-900 leading-none">
                      {userName}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] px-1.5 py-0 h-4 border-gray-300 text-gray-600 font-normal"
                    >
                      {roleLabel}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  title="Гарах"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
