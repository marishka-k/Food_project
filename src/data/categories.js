// Категории меню (чипсы и фильтр «Категория»)
const categories = [
  { id: 'starters', label: 'Закуски' },
  { id: 'soups', label: 'Супы' },
  { id: 'main', label: 'Основные блюда' },
  { id: 'sides', label: 'Гарниры' },
  { id: 'desserts', label: 'Десерты' },
  { id: 'drinks', label: 'Напитки' },
];

export default categories;

export const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));
