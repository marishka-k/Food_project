import { cx } from '../../utils/cx';
import styles from './Radio.module.css';

// Радиокнопка из UI Kit: нативный input + нарисованный кружок
export default function Radio({ name, value, checked, onChange, children, className, ...rest }) {
  return (
    <label className={cx(styles.radio, className)}>
      <input
        className={styles.radio__input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        {...rest}
      />
      <span className={styles.radio__circle} aria-hidden="true" />
      {children && <span className={styles.radio__label}>{children}</span>}
    </label>
  );
}
