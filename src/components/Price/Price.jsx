import { formatPrice } from '../../utils/format';
import { cx } from '../../utils/cx';
import styles from './Price.module.css';

// Цена «1 250 ₽»; prefix — подпись перед ценой («Цена:»)
export default function Price({ value, prefix, className }) {
  return (
    <span className={cx(styles.price, className)}>
      {prefix && <span className={styles.price__prefix}>{prefix}</span>}
      {formatPrice(value)}
    </span>
  );
}
