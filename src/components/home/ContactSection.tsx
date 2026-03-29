export default function ContactSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allLocations = [
    {
      id: 1,
      name: "River Villa, Ikh Nayaad",
      nameInMongolian: "Их наяад, Ривер Вилла",
      emoji: "🏢",
    },
    {
      id: 2,
      name: "Zanabazar Museum area",
      nameInMongolian: "Занабазарын музейн бүс",
      emoji: "🏛️",
    },
    {
      id: 3,
      name: "Ulaanbaatar Premium",
      nameInMongolian: "Улаанбаатар Премиум",
      emoji: "🏪",
    },
    {
      id: 4,
      name: "Yarmag Food City, 3rd floor, stall 64",
      nameInMongolian: "Ярмаг хүнсний төв, 3 давхар, лангуу 64",
      emoji: "🍽️",
    },
    {
      id: 5,
      name: "Bayanzurkh Market, building 64",
      nameInMongolian: "Баянзүрх зах, 64-р байр",
      emoji: "🏬",
    },
    {
      id: 6,
      name: "River Garden, River Tower",
      nameInMongolian: "Ривер Гарден, Ривер Тауэр",
      emoji: "🌊",
    },
    {
      id: 7,
      name: "Selenge Province, Zuunkharaa City",
      nameInMongolian: "Сэлэнгэ аймаг, Зуунхараа хот",
      emoji: "🏙️",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Холбоо барих
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Жинхэнэ Япон амтыг мэдрэхэд бэлэн үү?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              Холбоо барих мэдээлэл
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="font-medium text-gray-900 text-sm mb-1">И-мэйл</p>
                <a
                  href="mailto:yamaya.trade@gmail.com"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors"
                >
                  yamaya.trade@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="font-medium text-gray-900 text-sm mb-1">Утас</p>
                <a
                  href="tel:77096060"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors"
                >
                  7709-6060
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <p className="font-medium text-gray-900 text-sm mb-1">
                  Үйл ажиллагаа
                </p>
                <p className="text-gray-600 text-sm">Япон хүнсний төв</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">7 дэлгүүрийн сүлжээтэй</p>
            <a
              href="#locations"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
            >
              <span>Бүх байршил харах</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
