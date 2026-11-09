// Фильтрация и сортировка блюд для страницы «Меню»
const normalize = (text) => text.toLowerCase().replace(/ё/g, 'е').trim();

export function filterDishes(list, filters) {
  const query = normalize(filters.search);
  return list.filter((dish) => {
    if (filters.categories.length && !filters.categories.includes(dish.category)) return false;
    if (filters.ingredients.length && !filters.ingredients.includes(dish.ingredient)) return false;
    if (filters.features.some((feature) => !dish.features.includes(feature))) return false;
    if (query && !normalize(dish.name).includes(query)) return false;
    return true;
  });
}

const sorters = {
  popular: (a, b) => a.popularity - b.popularity,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'kcal-asc': (a, b) => a.kcal - b.kcal,
  'kcal-desc': (a, b) => b.kcal - a.kcal,
};

export const sortDishes = (list, sort) => [...list].sort(sorters[sort] || sorters.popular);

// Сколько фильтров выбрано (бейдж на кнопке мобильного фильтра)
export const countFilters = (filters) =>
  filters.categories.length +
  filters.ingredients.length +
  filters.features.length +
  (filters.search.trim() ? 1 : 0);
