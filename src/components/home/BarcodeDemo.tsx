"use client";

import { useRouter } from "next/navigation";

export default function BarcodeDemo() {
  const router = useRouter();

  const openScanner = () => {
    router.push("/scanner");
  };

  const sampleProducts = [
    {
      barcode: "4901588130652",
      name: "Шоколадтай эрдэнэ шишийн амттан",
      emoji: "🍪",
    },
    {
      barcode: "4901588617382",
      name: "Шоколадтай гүнжидийн үртэй жигнэмэг",
      emoji: "🍫",
    },
    {
      barcode: "4901588131161",
      name: "Ногоотой амьтадын хэлбэртэй жигнэмэг",
      emoji: "🦒",
    },
    {
      barcode: "4984352530056",
      name: "Үдийн хоолны мах",
      emoji: "🥩",
    },
    {
      barcode: "4902818718503",
      name: "Натто (исгэсэн шар буурцаг)",
      emoji: "🫘",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Баркод сканнер
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Бүтээгдэхүүний мэдээллийг шууд харахын тулд баркодыг скан хийнэ үү
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((item, index) => (
            <a
              key={index}
              href={`/product/${item.barcode}`}
              className="group bg-white hover:bg-red-50 rounded-xl p-6 transition-all duration-200 border border-gray-200 hover:border-red-200 hover:shadow-md"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  {item.name}
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Баркод:</div>
                  <div className="font-mono text-sm text-gray-800">
                    {item.barcode}
                  </div>
                </div>
                <div className="mt-3 text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Дэлгэрэнгүй →
                </div>
              </div>
            </a>
          ))}

          <button
            onClick={openScanner}
            className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-8 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-semibold mb-2 text-lg">Сканнер ашиглах</h4>
              <p className="text-red-100 text-sm">
                Камераа баркод руу чиглүүлнэ үү
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
