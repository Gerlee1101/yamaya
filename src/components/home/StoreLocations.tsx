interface Location {
  id: number;
  name: string;
  nameInMongolian: string;
  emoji: string;
  hours: string;
}

export default function StoreLocations() {
  const allLocations: Location[] = [
    {
      id: 1,
      name: "River Villa, Ikh Nayaad",
      nameInMongolian: "Их наяад, Ривер Вилла",
      emoji: "🏢",
      hours: "10:00-19:00",
    },
    {
      id: 2,
      name: "Zanabazar Museum area",
      nameInMongolian: "Занабазарын музейн бүс",
      emoji: "🏛️",
      hours: "10:00-19:00",
    },
    {
      id: 3,
      name: "Ulaanbaatar Premium",
      nameInMongolian: "Улаанбаатар Премиум",
      emoji: "🏪",
      hours: "10:00-19:00",
    },
    {
      id: 4,
      name: "Yarmag Food City",
      nameInMongolian: "Ярмаг хүнсний төв, 3 давхар, лангуу 64",
      emoji: "🍽️",
      hours: "10:00-19:00",
    },
    {
      id: 5,
      name: "Bayanzurkh Market",
      nameInMongolian: "Баянзүрх зах, 64-р байр",
      emoji: "🏬",
      hours: "10:00-19:00",
    },
    {
      id: 6,
      name: "River Garden",
      nameInMongolian: "Ривер Гарден, Ривер Тауэр",
      emoji: "🌊",
      hours: "10:00-19:00",
    },
    {
      id: 7,
      name: "Zuunkharaa City",
      nameInMongolian: "Сэлэнгэ аймаг, Зуунхараа хот",
      emoji: "🏙️",
      hours: "10:00-19:00",
    },
  ];

  return (
    <section id="locations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Дэлгүүрийн байршил
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yamaya Trade дэлгүүрүүд Улаанбаатар хот болон орон нутагт
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLocations.map((location) => (
            <div
              key={location.id}
              className="group bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <span className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-sm">
                      {location.id}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{location.emoji}</span>
                      <h4 className="text-base font-semibold text-gray-900">
                        {location.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {location.nameInMongolian}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{location.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
