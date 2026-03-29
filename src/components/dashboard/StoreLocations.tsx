interface Store {
  name: string;
  status: "active" | "pending";
}

const stores: Store[] = [
  { name: "River Villa, Их Наяад", status: "active" },
  { name: "Занабазарын музейн тойрог", status: "active" },
  { name: "Ulaanbaatar Premium", status: "active" },
  { name: "Ярмагийн Хүнсний хот", status: "pending" },
  { name: "Баянзүрхийн зах", status: "active" },
];

export default function StoreLocations() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Дэлгүүрийн байршлууд
      </h2>
      <div className="space-y-2 text-sm">
        {stores.map((store, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                store.status === "active" ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></span>
            <span>{store.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
