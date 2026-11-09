import Button from '../Button/Button';
import styles from './EmptyState.module.css';

// Пустое состояние: пустая корзина, нет избранного, нет заказов
export default function EmptyState({ title, text, action = 'Перейти в меню', to = '/menu' }) {
  return (
    <div className={styles.empty}>
      <p className={styles.empty__title}>{title}</p>
      {text && <p className={styles.empty__text}>{text}</p>}
      {action && (
        <Button to={to} className={styles.empty__button}>
          {action}
        </Button>
      )}
    </div>
  );
}
