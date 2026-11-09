import Icon from '../Icon/Icon';
import { cx } from '../../utils/cx';
import styles from './QuantityControl.module.css';

// «− 1 +» и урна. Минус на единице удаляет позицию.
// size: small — в карточках и корзине, large — на странице блюда
export default function QuantityControl({ name, qty, onChange, size = 'small', withRemove = true, className }) {
  return (
    <div className={cx(styles.quantity, styles[`quantity_size_${size}`], className)}>
      <div className={styles.quantity__counter} role="group" aria-label={`Количество: ${name}`}>
        <button
          type="button"
          className={styles.quantity__button}
          aria-label={qty === 1 ? `Убрать «${name}» из корзины` : 'Уменьшить количество'}
          onClick={() => onChange(qty - 1)}
        >
          −
        </button>
        <span className={styles.quantity__value} aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          className={styles.quantity__button}
          aria-label="Увеличить количество"
          disabled={qty >= 99}
          onClick={() => onChange(qty + 1)}
        >
          +
        </button>
      </div>
      {withRemove && (
        <button
          type="button"
          className={styles.quantity__remove}
          aria-label={`Удалить «${name}» из корзины`}
          onClick={() => onChange(0)}
        >
          <Icon name="trash" className={styles['quantity__remove-icon']} />
        </button>
      )}
    </div>
  );
}
