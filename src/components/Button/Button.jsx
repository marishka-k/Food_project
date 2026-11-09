import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

// Кнопки из UI Kit. variant: accent — оранжевая («В меню», «Оформить»),
// green — салатовая («в корзину», «Применить», «Выбрать другое время»).
// size: large | medium | small. to — ссылка внутри сайта
export default function Button({ children, variant = 'accent', size = 'medium', to, type = 'button', className, ...rest }) {
  const classes = cx(styles.button, styles[`button_variant_${variant}`], styles[`button_size_${size}`], className);

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
