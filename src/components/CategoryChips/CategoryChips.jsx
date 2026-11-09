import categories from '../../data/categories';
import { cx } from '../../utils/cx';
import styles from './CategoryChips.module.css';

// Чипсы категорий: можно выбрать несколько; ничего не выбрано — показываются все блюда
export default function CategoryChips({ value, onChange, className }) {
  const toggle = (id) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <ul className={cx(styles.chips, className)} aria-label="Категории">
      {categories.map((category) => {
        const active = value.includes(category.id);
        return (
          <li key={category.id}>
            <button
              type="button"
              className={cx(styles.chips__chip, active && styles.chips__chip_active)}
              aria-pressed={active}
              onClick={() => toggle(category.id)}
            >
              {category.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
