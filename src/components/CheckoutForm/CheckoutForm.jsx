import { useState } from 'react';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import FormField from '../FormField/FormField';
import Modal from '../Modal/Modal';
import Radio from '../Radio/Radio';
import { consentText, mapText, paymentMethods, paymentSystems } from '../../data/checkout';
import { validateCheckout } from '../../utils/validate';
import { asset } from '../../utils/asset';
import styles from './CheckoutForm.module.css';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  street: '',
  house: '',
  building: '',
  flat: '',
  payment: 'card-online',
  system: 'mastercard',
  cardNumber: '',
  cardHolder: '',
  cardExpiry: '',
  cardCvv: '',
  slot: '',
  earlier: false,
  consent: false,
};

// Форма оформления заказа (демо): проверяет поля и передаёт наверх только способ оплаты и время.
// Данные карты нигде не сохраняются
export default function CheckoutForm({ slots, onPaymentChange, onSubmit }) {
  const [values, setValues] = useState({ ...initialValues, slot: slots.slots[0] });
  const [errors, setErrors] = useState({});
  const [otherTime, setOtherTime] = useState(false);
  const [info, setInfo] = useState(null);

  const set = (name) => (value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'payment') onPaymentChange(value);
  };

  const field = (name, label, props = {}) => (
    <FormField
      id={`checkout-${name}`}
      label={label}
      value={values[name]}
      onChange={set(name)}
      error={errors[name]}
      {...props}
    />
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`checkout-${first}`)?.focus();
      return;
    }
    onSubmit({ payment: values.payment, slot: values.slot, earlier: values.earlier });
  };

  const needCard = values.payment === 'card-online' && values.system !== 'sbp';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.form__section}>
        <legend className={styles.form__title}>Контактная информация</legend>
        <div className={styles.form__grid}>
          {field('firstName', 'Имя', { autoComplete: 'given-name', required: true })}
          {field('lastName', 'Фамилия', { autoComplete: 'family-name' })}
          {field('phone', 'Номер телефона', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', required: true })}
          {field('email', 'E-mail', { type: 'email', autoComplete: 'email' })}
        </div>
      </fieldset>

      <fieldset className={styles.form__section}>
        <legend className={styles.form__title}>Адрес доставки</legend>
        <div className={styles.form__grid}>
          {field('city', 'Город', { autoComplete: 'address-level2', required: true })}
          {field('street', 'Улица', { autoComplete: 'address-line1', required: true })}
        </div>
        <div className={styles.form__address}>
          {field('house', 'Дом', { required: true })}
          {field('building', 'Корпус')}
          {field('flat', 'Квартира (офис)')}
          <Button variant="green" size="small" className={styles.form__map} onClick={() => setInfo('map')}>
            Выбрать на карте
          </Button>
        </div>
      </fieldset>

      <fieldset className={styles.form__section}>
        <legend className={styles.form__title}>Оплата</legend>
        <div className={styles.form__payment}>
          <div className={styles.form__methods} role="radiogroup" aria-label="Способ оплаты">
            {paymentMethods.map((method) => (
              <Radio
                key={method.id}
                name="payment"
                value={method.id}
                checked={values.payment === method.id}
                onChange={set('payment')}
              >
                {method.label}
                {method.note && <span className={styles.form__note}>{method.note}</span>}
              </Radio>
            ))}
          </div>

          {values.payment === 'card-online' && (
            <div className={styles.form__online}>
              <div className={styles.form__systems} role="radiogroup" aria-label="Платёжная система">
                {paymentSystems.map((system) => (
                  <Radio
                    key={system.id}
                    name="system"
                    value={system.id}
                    checked={values.system === system.id}
                    onChange={set('system')}
                    className={styles.form__system}
                  >
                    <img
                      src={asset(system.image)}
                      alt={system.label}
                      width={system.width}
                      height={system.height}
                      className={styles['form__system-logo']}
                    />
                  </Radio>
                ))}
              </div>
              {needCard ? (
                <div className={styles.form__grid}>
                  {field('cardNumber', 'Номер карты', { inputMode: 'numeric', autoComplete: 'off', maxLength: 19 })}
                  {field('cardHolder', 'Держатель', { autoComplete: 'off' })}
                  {field('cardExpiry', 'Срок действия', { inputMode: 'numeric', autoComplete: 'off', maxLength: 5 })}
                  {field('cardCvv', 'CVV/CVC-код', {
                    inputMode: 'numeric',
                    autoComplete: 'off',
                    maxLength: 3,
                    type: 'password',
                  })}
                </div>
              ) : (
                <p className={styles.form__hint}>После подтверждения откроется QR-код для оплаты через СБП (демо).</p>
              )}
            </div>
          )}
        </div>
      </fieldset>

      <fieldset className={styles.form__section}>
        <legend className={styles.form__title}>Время доставки</legend>
        <div className={styles.form__time}>
          <div className={styles['form__time-info']}>
            {otherTime ? (
              <label className={styles.form__slot}>
                <span>Интервал ({slots.day}):</span>
                <select value={values.slot} onChange={(event) => set('slot')(event.target.value)}>
                  {slots.slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className={styles.form__nearest}>
                Ближайшее{slots.day === 'завтра' ? ' (завтра)' : ''}: {values.slot}
              </p>
            )}
            <Checkbox checked={values.earlier} onChange={set('earlier')}>
              Можно доставить раньше <span className={styles.form__extra}>указанного</span>
            </Checkbox>
          </div>
          <Button
            variant="green"
            size="small"
            className={styles['form__time-button']}
            aria-expanded={otherTime}
            onClick={() => setOtherTime(!otherTime)}
          >
            {otherTime ? 'Ближайшее время' : 'Выбрать другое время'}
          </Button>
        </div>
      </fieldset>

      <div className={styles.form__consent}>
        <p>Перед оформлением необходимо дать согласие</p>
        <div className={styles['form__consent-row']}>
          <Checkbox
            id="checkout-consent"
            checked={values.consent}
            onChange={set('consent')}
            error={errors.consent}
            describedBy={errors.consent ? 'checkout-consent-error' : undefined}
          >
            <span className="visually-hidden">Согласие на обработку персональных данных</span>
          </Checkbox>
          <button type="button" className={styles.form__link} onClick={() => setInfo('consent')}>
            На обработку персональных данных
          </button>
        </div>
        {errors.consent && (
          <p id="checkout-consent-error" className={styles.form__error}>
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" className={styles.form__submit}>
        Подтвердить и оформить
      </Button>

      <Modal isOpen={Boolean(info)} onClose={() => setInfo(null)} labelledBy="checkout-info-title">
        <h2 id="checkout-info-title" className={styles['form__info-title']}>
          {info === 'map' ? 'Выбор на карте' : 'Согласие на обработку данных'}
        </h2>
        <p className={styles['form__info-text']}>{info === 'map' ? mapText : consentText}</p>
      </Modal>
    </form>
  );
}
