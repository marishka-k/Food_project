import DishCard from '../DishCard/DishCard';
import { cx } from '../../utils/cx';
import styles from './DishList.module.css';

// Список карточек. layout:
// row — на телефоне лента с прокруткой вбок, с 600 px — сетка, с 1024 px — 4 колонки (главная, корзина);
// grid — сетка меню: на телефоне одна колонка, дальше столько колонок, сколько помещается;
// wide — как grid, но с 1024 px 4 колонки (страница без колонки фильтров)
export default function DishList({ dishes, layout = 'row', label, className }) {
  return (
    <ul className={cx(styles['dish-list'], styles[`dish-list_layout_${layout}`], className)} aria-label={label}>
      {dishes.map((dish) => (
        <li key={dish.id} className={styles['dish-list__item']}>
          <DishCard dish={dish} />
        </li>
      ))}
    </ul>
  );
}
