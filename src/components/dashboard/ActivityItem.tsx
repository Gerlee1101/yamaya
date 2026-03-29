interface ActivityItemProps {
  id: number;
  action: string;
  product: string;
  time: string;
}

export default function ActivityItem({
  id,
  action,
  product,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-red-600 font-bold text-xs lg:text-sm">{id}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs lg:text-sm font-medium text-gray-900 truncate lg:whitespace-normal">
          {action}
        </p>
        <p className="text-xs lg:text-sm text-gray-600 truncate lg:whitespace-normal">
          {product}
        </p>
      </div>
      <div className="text-xs lg:text-sm text-gray-500 flex-shrink-0">
        {time}
      </div>
    </div>
  );
}
