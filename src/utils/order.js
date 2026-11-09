import { dishById } from '../data/dishes';
import { DELIVERY_PRICE, FREE_DELIVERY_FROM, ONLINE_DISCOUNT, promoCodes } from '../data/checkout';

// Позиции корзины с данными блюд (блюда, которых нет в меню, пропускаются)
export const cartLines = (cart) =>
  cart.filter((line) => dishById[line.id]).map((line) => ({ ...line, dish: dishById[line.id] }));

export const goodsTotal = (lines) => lines.reduce((sum, line) => sum + line.dish.price * line.qty, 0);
export const itemsCount = (lines) => lines.reduce((sum, line) => sum + line.qty, 0);

// Проверка промокода: { ok, discount, message }
export function checkPromo(code, goods) {
  const promo = code && promoCodes[code];
  if (!promo) return { ok: false, discount: 0, message: 'Промокод не найден' };
  if (goods < promo.minTotal) {
    return { ok: false, discount: 0, message: `Действует при заказе от ${promo.minTotal.toLocaleString('ru-RU')} ₽` };
  }
  return { ok: true, discount: promo.discount, message: 'Промокод применён' };
}

// Итоговые суммы заказа
export function orderTotals(lines, promo, paymentMethod) {
  const goods = goodsTotal(lines);
  const promoValue = promo ? checkPromo(promo, goods).discount : 0;
  const online = paymentMethod === 'card-online' ? Math.round(goods * ONLINE_DISCOUNT) : 0;
  const delivery = goods >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  return { goods, promoValue, online, delivery, total: Math.max(goods - promoValue - online, 0) + delivery };
}

const pad = (n) => String(n).padStart(2, '0');
const slotLabel = (hour) => `${pad(hour)}:00 - ${pad(hour + 1)}:00`;

// Интервалы доставки: ближайший — через час после текущего (кухня работает 10–22).
// Поздно вечером — интервалы на завтра
export function deliverySlots(now = new Date()) {
  let first = now.getHours() + (now.getMinutes() > 0 ? 2 : 1);
  let day = 'сегодня';
  if (first > 21) {
    first = 10;
    day = 'завтра';
  }
  first = Math.max(first, 10);
  const slots = [];
  for (let hour = first; hour <= 21; hour += 1) slots.push(slotLabel(hour));
  return { day, slots };
}

// Номер заказа для демо-окна «Заказ оформлен»
export const makeOrderNumber = () => String(1000 + Math.floor(Math.random() * 9000));
