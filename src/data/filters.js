// Фильтры и сортировка страницы «Меню»

export const ingredients = [
  { id: 'meat', label: 'Мясные' },
  { id: 'fish', label: 'Рыбные и морепродукты' },
  { id: 'vegetable', label: 'Овощные' },
  { id: 'grain', label: 'Крупяные и макаронные' },
  { id: 'dairy', label: 'Молочные и яичные' },
];

export const features = [
  { id: 'vegetarian', label: 'Вегетарианская кухня' },
  { id: 'gluten-free', label: 'Без глютена' },
  { id: 'sugar-free', label: 'Без сахара' },
  { id: 'spicy', label: 'Острое' },
  { id: 'low-cal', label: 'Низкокалорийное' },
];

export const sortOptions = [
  { id: 'popular', label: 'По популярности' },
  { id: 'price-asc', label: 'Сначала дешевле' },
  { id: 'price-desc', label: 'Сначала дороже' },
  { id: 'kcal-asc', label: 'Меньше калорий' },
  { id: 'kcal-desc', label: 'Больше калорий' },
];

export const emptyFilters = {
  categories: [],
  ingredients: [],
  features: [],
  search: '',
};
