import { useState } from 'react';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import Price from '../Price/Price';
import { useStore } from '../../store/StoreContext';
import { checkPromo, goodsTotal, itemsCount } from '../../utils/order';
import { formatPrice } from '../../utils/format';
import styles from './CartSummary.module.css';

// Правая колонка корзины: промокод и «Информация о заказе»
export default function CartSummary({ lines }) {
  const { promo, setPromo } = useStore();
  const [code, setCode] = useState(promo);
  const [message, setMessage] = useState('');

  const goods = goodsTotal(lines);
  const promoResult = promo ? checkPromo(promo, goods) : null;
  const discount = promoResult?.discount || 0;

  const handleApply = (event) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setPromo('');
      setMessage('Введите промокод');
      return;
    }
    const result = checkPromo(normalized, goods);
    setCode(normalized);
    setMessage(result.message);
    setPromo(result.ok ? normalized : '');
  };

  return (
    <aside className={styles.summary} aria-label="Итог заказа">
      <form className={styles.summary__promo} onSubmit={handleApply}>
        <label className={styles.summary__title} htmlFor="promo">
          Промокод:
        </label>
        <FormField
          id="promo"
          label="Промокод"
          placeholder="Например, SPRING2026"
          value={code}
          onChange={setCode}
          autoComplete="off"
          className={styles.summary__field}
        />
        <p className={styles.summary__message} role="status">
          {message || (promoResult && !promoResult.ok ? promoResult.message : '')}
        </p>
        <Button type="submit" variant="green" size="small" className={styles.summary__apply}>
          Применить
        </Button>
      </form>

      <h2 className={styles.summary__title}>Информация о заказе:</h2>
      <dl className={styles.summary__list}>
        <div className={styles.summary__row}>
          <dt>Товары ({itemsCount(lines)})</dt>
          <dd>{formatPrice(goods)}</dd>
        </div>
        {discount > 0 && (
          <div className={styles.summary__row}>
            <dt>Промокод</dt>
            <dd>−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className={styles.summary__total}>
          <dt>Общая сумма:</dt>
          <dd>
            <Price value={goods - discount} className={styles['summary__total-price']} />
          </dd>
        </div>
      </dl>

      <Button to="/checkout" className={styles.summary__checkout}>
        Оформить
      </Button>
    </aside>
  );
}
