import { Link } from 'react-router-dom';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Price from '../Price/Price';
import QuantityControl from '../QuantityControl/QuantityControl';
import { categoryLabel } from '../../data/categories';
import { useStore } from '../../store/StoreContext';
import { dishPhoto } from '../../utils/asset';
import { formatMeta } from '../../utils/format';
import { cx } from '../../utils/cx';
import styles from './DishCard.module.css';

// Карточка блюда (утверждённый вариант «с иерархией»: категория плашкой, название, мета, цена крупно).
// Если блюдо уже в корзине — вместо «в корзину» счётчик и урна (как в UI Kit)
export default function DishCard({ dish, showBadge = true, className }) {
  const { getQty, setQty, addToCart } = useStore();
  const qty = getQty(dish.id);
  const url = `/dish/${dish.id}`;

  return (
    <article className={cx(styles['dish-card'], className)}>
      <div className={styles['dish-card__media']}>
        <Link to={url} tabIndex={-1} aria-hidden="true">
          <img
            className={styles['dish-card__image']}
            src={dishPhoto(dish.photos[0])}
            alt=""
            width="900"
            height="700"
            loading="lazy"
          />
        </Link>
        {showBadge && dish.badge && <Badge type={dish.badge} className={styles['dish-card__badge']} />}
        <FavoriteButton id={dish.id} name={dish.name} className={styles['dish-card__favorite']} />
      </div>

      <div className={styles['dish-card__body']}>
        <p className={styles['dish-card__category']}>{categoryLabel[dish.category]}</p>
        <h3 className={styles['dish-card__title']}>
          <Link className={styles['dish-card__link']} to={url}>
            {dish.name}
          </Link>
        </h3>
        <p className={styles['dish-card__meta']}>{formatMeta(dish)}</p>

        <div className={cx(styles['dish-card__row'], qty > 0 && styles['dish-card__row_in-cart'])}>
          <Price value={dish.price} className={styles['dish-card__price']} />
          {qty > 0 ? (
            <QuantityControl name={dish.name} qty={qty} onChange={(value) => setQty(dish.id, value)} />
          ) : (
            <Button
              variant="green"
              size="small"
              className={styles['dish-card__button']}
              aria-label={`В корзину: ${dish.name}`}
              onClick={() => addToCart(dish.id)}
            >
              в корзину
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
