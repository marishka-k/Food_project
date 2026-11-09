import Icon from '../Icon/Icon';
import { useStore } from '../../store/StoreContext';
import { cx } from '../../utils/cx';
import styles from './FavoriteButton.module.css';

// Сердечко «в избранное» на фото блюда
export default function FavoriteButton({ id, name, className }) {
  const { favorites, toggleFavorite } = useStore();
  const active = favorites.includes(id);

  return (
    <button
      type="button"
      className={cx(styles.favorite, active && styles.favorite_active, className)}
      aria-pressed={active}
      aria-label={active ? `Убрать «${name}» из избранного` : `Добавить «${name}» в избранное`}
      onClick={() => toggleFavorite(id)}
    >
      <Icon name="heart-outline" className={styles.favorite__icon} />
    </button>
  );
}
