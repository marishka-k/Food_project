// Цена с неразрывными пробелами: 1 250 ₽
export const formatPrice = (value) =>
  `${Math.round(value).toLocaleString('ru-RU').replace(/\s/g, ' ')} ₽`;

// Строка «320 ккал · 180 г · 15 мин»
export const formatMeta = (dish) => `${dish.kcal} ккал · ${dish.weight} ${dish.unit} · ${dish.time} мин`;

// Склонение: plural(5, ['минута', 'минуты', 'минут'])
export function plural(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}
