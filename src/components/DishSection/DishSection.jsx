import { useId } from 'react';
import DishList from '../DishList/DishList';
import SectionTitle from '../SectionTitle/SectionTitle';
import { cx } from '../../utils/cx';
import styles from './DishSection.module.css';

// Блок «заголовок + карточки» (главная, корзина, страница блюда)
export default function DishSection({ title, dishes, className }) {
  const titleId = useId();
  if (!dishes.length) return null;

  return (
    <section className={cx(styles['dish-section'], className)} aria-labelledby={titleId}>
      <SectionTitle id={titleId} className={styles['dish-section__title']}>
        {title}
      </SectionTitle>
      <DishList dishes={dishes} layout="row" />
    </section>
  );
}
