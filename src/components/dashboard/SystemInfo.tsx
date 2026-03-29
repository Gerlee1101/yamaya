export default function SystemInfo() {
  const systemData = [
    { label: "Системийн хувилбар:", value: "v1.0.0", color: "" },
    { label: "Сүүлийн шинэчлэл:", value: "2025-10-13", color: "" },
    { label: "Өгөгдлийн сан:", value: "Холбогдсон", color: "text-green-600" },
    { label: "Баркод сканнер:", value: "Идэвхтэй", color: "text-green-600" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Системийн мэдээлэл
      </h2>
      <div className="space-y-3">
        {systemData.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{item.label}</span>
            <span className={`font-medium ${item.color || ""}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
