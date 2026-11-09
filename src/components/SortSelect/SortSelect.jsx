import Icon from '../Icon/Icon';
import { sortOptions } from '../../data/filters';
import { cx } from '../../utils/cx';
import styles from './SortSelect.module.css';

// Сортировка: нативный select в оформлении UI Kit (стрелка-треугольник)
export default function SortSelect({ value, onChange, className }) {
  return (
    <label className={cx(styles.sort, className)}>
      <span className="visually-hidden">Сортировка</span>
      <select className={styles.sort__select} value={value} onChange={(event) => onChange(event.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="triangle-down" className={styles.sort__arrow} />
    </label>
  );
}
