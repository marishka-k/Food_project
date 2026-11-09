import { useEffect, useId, useState } from 'react';
import { repeatOrder } from '../../data/content';
import { useStore } from '../../store/StoreContext';
import { cx } from '../../utils/cx';
import styles from './RepeatOrderButton.module.css';

// «Повторить прошлый заказ»: кладёт прошлый заказ в корзину.
// Если заказов ещё не было — кнопка бледная, по нажатию появляется подсказка
export default function RepeatOrderButton({ className, onRepeat }) {
  const { lastOrder, repeatLastOrder } = useStore();
  const [hint, setHint] = useState(false);
  const hintId = useId();

  useEffect(() => {
    if (!hint) return undefined;
    const timer = setTimeout(() => setHint(false), 3000);
    return () => clearTimeout(timer);
  }, [hint]);

  const handleClick = () => {
    if (!lastOrder) {
      setHint(true);
      return;
    }
    repeatLastOrder();
    onRepeat?.();
  };

  return (
    <div className={cx(styles.repeat, className)}>
      <button
        type="button"
        className={cx(styles.repeat__button, !lastOrder && styles.repeat__button_empty)}
        aria-disabled={!lastOrder}
        aria-describedby={lastOrder ? undefined : hintId}
        title={lastOrder ? `Заказ №${lastOrder.number}` : repeatOrder.empty}
        onClick={handleClick}
      >
        {repeatOrder.label}
      </button>
      <span id={hintId} className={cx(styles.repeat__hint, hint && styles.repeat__hint_visible)} role="status">
        {hint ? repeatOrder.empty : ''}
      </span>
    </div>
  );
}
