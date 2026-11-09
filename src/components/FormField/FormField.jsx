import { cx } from '../../utils/cx';
import styles from './FormField.module.css';

// Поле ввода из UI Kit: подпись-плейсхолдер, рамка, текст ошибки под полем.
// Подпись (label) доступна экранным дикторам через aria-label, placeholder по умолчанию совпадает с ней
export default function FormField({ id, label, placeholder = label, value, onChange, error, required, className, ...rest }) {
  const errorId = `${id}-error`;
  return (
    <div className={cx(styles.field, className)}>
      <input
        id={id}
        className={cx(styles.field__input, error && styles.field__input_error, value && styles.field__input_filled)}
        placeholder={placeholder}
        aria-label={required ? `${label} (обязательно)` : label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
      {error && (
        <span id={errorId} className={styles.field__error}>
          {error}
        </span>
      )}
    </div>
  );
}
