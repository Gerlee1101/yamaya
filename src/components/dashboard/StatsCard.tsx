interface StatsCardProps {
  icon: string;
  value: number;
  label: string;
  bgColor: string;
}

export default function StatsCard({
  icon,
  value,
  label,
  bgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 lg:w-12 lg:h-12 ${bgColor} rounded-lg flex items-center justify-center`}
          >
            <span className="text-xl lg:text-2xl">{icon}</span>
          </div>
        </div>
        <div className="ml-3 lg:ml-4">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
            {value}
          </h3>
          <p className="text-xs lg:text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
