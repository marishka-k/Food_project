// Проверка формы оформления заказа. Возвращает объект { поле: текст ошибки }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/;

export function validateCheckout(values) {
  const errors = {};
  const phoneDigits = values.phone.replace(/\D/g, '');

  if (!values.firstName.trim()) errors.firstName = 'Введите имя';
  else if (!NAME_RE.test(values.firstName.trim())) errors.firstName = 'Только буквы';
  if (values.lastName.trim() && !NAME_RE.test(values.lastName.trim())) errors.lastName = 'Только буквы';

  if (!values.phone.trim()) errors.phone = 'Введите телефон';
  else if (/[^\d\s()+-]/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = 'Например: +7 900 000-00-00';
  }
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) errors.email = 'Проверьте e-mail';

  if (!values.city.trim()) errors.city = 'Введите город';
  if (!values.street.trim()) errors.street = 'Введите улицу';
  if (!values.house.trim()) errors.house = 'Введите дом';

  // Поля карты проверяются только по формату и нигде не сохраняются
  if (values.payment === 'card-online' && values.system !== 'sbp') {
    if (!/^\d{16}$/.test(values.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Нужно 16 цифр';
    if (!values.cardHolder.trim()) errors.cardHolder = 'Как на карте';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.cardExpiry.trim())) errors.cardExpiry = 'Формат ММ/ГГ';
    if (!/^\d{3}$/.test(values.cardCvv.trim())) errors.cardCvv = 'Нужно 3 цифры';
  }

  if (!values.consent) errors.consent = 'Нужно согласие';
  return errors;
}
