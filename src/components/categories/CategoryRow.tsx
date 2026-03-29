interface CategoryRowProps {
  category: {
    id: string;
    name: string;
    icon: string | null;
    createdAt: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-2xl">{category.icon || "📦"}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{category.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(category.createdAt).toLocaleDateString("mn-MN")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-900"
          >
            Засах
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900"
          >
            Устгах
          </button>
        </div>
      </td>
    </tr>
  );
}
