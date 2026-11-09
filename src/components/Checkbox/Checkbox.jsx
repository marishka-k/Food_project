import Icon from '../Icon/Icon';
import { cx } from '../../utils/cx';
import styles from './Checkbox.module.css';

// Чекбокс из UI Kit: нативный input (доступен с клавиатуры) + нарисованный квадрат
export default function Checkbox({ id, checked, onChange, children, name, value, error, describedBy, className }) {
  return (
    <label className={cx(styles.checkbox, error && styles.checkbox_error, className)}>
      <input
        className={styles.checkbox__input}
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      <span className={styles.checkbox__box} aria-hidden="true">
        <Icon name="check" className={styles.checkbox__check} />
      </span>
      <span className={styles.checkbox__label}>{children}</span>
    </label>
  );
}
