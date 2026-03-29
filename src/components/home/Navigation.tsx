"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  isScrolled: boolean;
}

export default function Navigation({ isScrolled }: NavigationProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openScanner = () => {
    router.push("/barcode-scanner");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md backdrop-blur-md"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <Image
              src="/logo.png"
              alt="Yamaya Trade"
              width={180}
              height={45}
              className="object-contain"
            />

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <button
                  onClick={() => navigateToSection("home")}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm"
                >
                  Нүүр
                </button>
                <button
                  onClick={() => navigateToSection("products")}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm"
                >
                  Бүтээгдэхүүн
                </button>
                <button
                  onClick={() => navigateToSection("locations")}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm"
                >
                  Байршил
                </button>
                <button
                  onClick={() => navigateToSection("contact")}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm"
                >
                  Холбоо барих
                </button>
              </nav>

              {/* Barcode Scanner Button */}
              <button
                onClick={openScanner}
                className="bg-red-600 hover:bg-red-700 text-white px-3 lg:px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 text-sm font-medium"
                title="Scan Barcode"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line
                    x1="6"
                    y1="9"
                    x2="6"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="8"
                    y1="9"
                    x2="8"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="9"
                    x2="10"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="12"
                    y1="9"
                    x2="12"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="14"
                    y1="9"
                    x2="14"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="16"
                    y1="9"
                    x2="16"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="18"
                    y1="9"
                    x2="18"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">
                  Сканнер
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobileMenu}
          ></div>

          {/* Sheet */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Цэс</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 px-4">
                <nav className="space-y-4">
                  <button
                    onClick={() => navigateToSection("home")}
                    className="w-full text-left block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    🏠 Нүүр
                  </button>
                  <button
                    onClick={() => navigateToSection("products")}
                    className="w-full text-left block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    📦 Бүтээгдэхүүн
                  </button>

                  {/* Sale Pages */}
                  <div className="border-t border-b border-gray-200 py-2 my-2">
                    <p className="text-xs font-semibold text-gray-500 px-4 mb-2">
                      ХЯМДРАЛУУД
                    </p>
                    <button
                      onClick={() => {
                        router.push("/sales/monthly");
                        closeMobileMenu();
                      }}
                      className="w-full text-left block py-3 px-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                    >
                      📅 Сарын хямдрал
                    </button>
                    <button
                      onClick={() => {
                        router.push("/sales/super");
                        closeMobileMenu();
                      }}
                      className="w-full text-left block py-3 px-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-semibold"
                    >
                      🔥 Супер хямдрал
                    </button>
                  </div>

                  <button
                    onClick={() => navigateToSection("locations")}
                    className="w-full text-left block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    📍 Байршил
                  </button>
                  <button
                    onClick={() => navigateToSection("contact")}
                    className="w-full text-left block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    📞 Холбоо барих
                  </button>
                </nav>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    openScanner();
                    closeMobileMenu();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <line
                      x1="6"
                      y1="9"
                      x2="6"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="8"
                      y1="9"
                      x2="8"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="10"
                      y1="9"
                      x2="10"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="12"
                      y1="9"
                      x2="12"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="14"
                      y1="9"
                      x2="14"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="16"
                      y1="9"
                      x2="16"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="18"
                      y1="9"
                      x2="18"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Бар код сканнер</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
