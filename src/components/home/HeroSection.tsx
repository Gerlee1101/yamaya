import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, ShoppingBag, Heart, Award } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-100 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-100 rounded-full opacity-25 animate-ping"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H18v2.5h-2.5V22H18v2.5h2V22h2.5v-1.5H20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-20 left-20 h-6 w-6 text-red-300 opacity-60 animate-pulse" />
        <Sparkles className="absolute top-32 right-32 h-5 w-5 text-orange-300 opacity-50 animate-bounce" />
        <Heart className="absolute bottom-32 left-32 h-4 w-4 text-pink-300 opacity-70 animate-pulse" />
        <Award className="absolute bottom-20 right-20 h-6 w-6 text-yellow-400 opacity-60 animate-bounce" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
        {/* Top badge */}

        {/* Logo section with enhanced styling */}
        <div className="mb-8">
          <div className="relative w-full mx-auto">
            <div className="relative w-full h-[200px]">
              <Image
                alt="Yamaya Trade Logo"
                src="/big-logo.jpg"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4 font-light max-w-3xl mx-auto leading-relaxed">
            Таны хэрэглээг{" "}
            <span className="font-semibold text-red-600">чанаржуулна</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/sales/monthly">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 group-hover:animate-bounce" />
                Энэ сарын хямдрал
              </div>
            </Button>
          </Link>

          <Link href="/sales/super">
            <Button
              variant="outline"
              size="lg"
              className="hover:border-red-500 hover:text-red-600 bg-white/80 backdrop-blur-sm px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Онцгой хямдрал
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="h-5 w-5 fill-current text-yellow-400" />
              <span className="text-sm font-medium">
                Япон улсын шилдэг брэндүүд
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="h-5 w-5 fill-current text-blue-400" />
              <span className="text-sm font-medium">Чанарын баталгаатай</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
