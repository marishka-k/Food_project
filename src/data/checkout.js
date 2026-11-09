// Оформление заказа: способы оплаты, платёжные системы, промокоды, доставка

export const paymentMethods = [
  { id: 'card-online', label: 'Картой онлайн', note: '(скидка 5% на сумму заказа)' },
  { id: 'card-courier', label: 'Картой при доставке' },
  { id: 'cash', label: 'Наличными при доставке' },
];

export const paymentSystems = [
  { id: 'mastercard', label: 'Mastercard', image: 'images/payment/mastercard.webp', width: 46, height: 28 },
  { id: 'visa', label: 'Visa', image: 'images/payment/visa.webp', width: 46, height: 28 },
  { id: 'mir', label: 'Мир', image: 'images/payment/mir.webp', width: 46, height: 28 },
  { id: 'sbp', label: 'СБП', image: 'images/payment/sbp.webp', width: 69, height: 35 },
];

export const ONLINE_DISCOUNT = 0.05;
export const DELIVERY_PRICE = 500;
export const FREE_DELIVERY_FROM = 5000;

// Демо-промокоды: код → скидка в рублях и минимальная сумма товаров
export const promoCodes = {
  SPRING2026: { discount: 1000, minTotal: 2000 },
};

export const consentText =
  'Это учебный проект: данные формы никуда не передаются и не сохраняются. На настоящем сайте здесь был бы текст согласия на обработку персональных данных.';

export const mapText = 'В учебном проекте карта не подключена — введите адрес в полях формы.';
