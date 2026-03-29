// Utility functions for product display
export const getProductEmoji = (productName: string): string => {
  if (
    productName.includes("шоколад") ||
    productName.includes("амттан") ||
    productName.includes("жигнэмэг")
  ) {
    return "🍪";
  }
  if (productName.includes("мах")) {
    return "🥩";
  }
  if (productName.includes("натто") || productName.includes("буурцаг")) {
    return "🫘";
  }
  if (productName.includes("сүмс")) {
    return "🍯";
  }
  return "🍱"; // Default Japanese food emoji
};

export const getProductCategory = (productName: string): string => {
  if (
    productName.includes("шоколад") ||
    productName.includes("амттан") ||
    productName.includes("жигнэмэг")
  ) {
    return "Амттан, Жигнэмэг";
  }
  if (productName.includes("мах")) {
    return "Махан бүтээгдэхүүн";
  }
  if (productName.includes("натто") || productName.includes("буурцаг")) {
    return "Исгэсэн хүнс";
  }
  if (productName.includes("сүмс")) {
    return "Амтлагч";
  }
  return "Япон хүнс";
};