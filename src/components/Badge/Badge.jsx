import { cx } from '../../utils/cx';
import styles from './Badge.module.css';

const labels = { new: 'Новое', popular: 'Популярное' };

// Плашка на фото блюда: «Новое» или «Популярное»
export default function Badge({ type, className }) {
  if (!labels[type]) return null;
  return <span className={cx(styles.badge, styles[`badge_type_${type}`], className)}>{labels[type]}</span>;
}
