import { formatPrice } from '../../utils/format';
import { dishPhoto } from '../../utils/asset';
import styles from './OrderSummary.module.css';

// Блок «Ваш заказ» на странице оформления
export default function OrderSummary({ lines, totals, promo }) {
  return (
    <section className={styles.summary} aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" className={styles.summary__title}>
        Ваш заказ:
      </h2>
      <ul className={styles.summary__list}>
        {lines.map(({ dish, qty }) => (
          <li key={dish.id} className={styles.summary__item}>
            <img className={styles.summary__image} src={dishPhoto(dish.photos[0])} alt="" width="67" height="47" />
            <span className={styles.summary__name}>
              {dish.name} ({qty})
            </span>
            <span className={styles.summary__price}>{formatPrice(dish.price * qty)}</span>
          </li>
        ))}
      </ul>

      <dl className={styles.summary__rows}>
        {totals.online > 0 && (
          <div className={styles.summary__row}>
            <dt>Скидка при оплате онлайн</dt>
            <dd>−{formatPrice(totals.online)}</dd>
          </div>
        )}
        {totals.promoValue > 0 && (
          <div className={styles.summary__row}>
            <dt>
              Промокод: <span className={styles.summary__code}>{promo}</span>
            </dt>
            <dd>−{formatPrice(totals.promoValue)}</dd>
          </div>
        )}
        <div className={styles.summary__row}>
          <dt>Доставка</dt>
          <dd>{totals.delivery ? formatPrice(totals.delivery) : 'бесплатно'}</dd>
        </div>
        <div className={styles.summary__total}>
          <dt>Общая сумма к оплате:</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
