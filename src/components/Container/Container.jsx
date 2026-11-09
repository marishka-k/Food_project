import { cx } from '../../utils/cx';
import styles from './Container.module.css';

// Контентная колонка: максимум 1400 px по центру, боковые отступы из токенов
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cx(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
