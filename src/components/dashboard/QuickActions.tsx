import Link from "next/link";

interface Action {
  href: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
}

const actions: Action[] = [
  {
    href: "/admin/products/create",
    icon: "➕",
    title: "Бүтээгдэхүүн нэмэх",
    description: "Шинэ бүтээгдэхүүн бүртгэх",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-100",
  },
  {
    href: "/admin/products",
    icon: "📦",
    title: "Бүтээгдэхүүнүүд",
    description: "Жагсаалт харах",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
  },
  {
    href: "/admin/categories",
    icon: "🏷️",
    title: "Ангиллууд",
    description: "Ангилал удирдах",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    href: "/",
    icon: "🏠",
    title: "Үндсэн хуудас",
    description: "Сайт үзэх",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
      <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">
        Түргэн үйлдлүүд
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex items-center space-x-3 p-3 lg:p-4 ${action.bgColor} rounded-lg ${action.hoverColor} transition-colors`}
          >
            <span className="text-xl lg:text-2xl">{action.icon}</span>
            <div>
              <h3 className="text-sm lg:text-base font-medium text-gray-900">
                {action.title}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
