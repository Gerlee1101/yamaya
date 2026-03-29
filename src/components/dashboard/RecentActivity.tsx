import ActivityItem from "./ActivityItem";

interface Activity {
  id: number;
  action: string;
  product: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
      <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">
        Сүүлийн үйл ажиллагаа
      </h2>
      <div className="space-y-3 lg:space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
}
