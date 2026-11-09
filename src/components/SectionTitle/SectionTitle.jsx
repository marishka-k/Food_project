import { cx } from '../../utils/cx';
import styles from './SectionTitle.module.css';

// Заголовки: level 1 — заголовок страницы (H2 из UI Kit), level 2 — заголовок блока (H3)
export default function SectionTitle({ children, level = 2, id, className }) {
  const Tag = level === 1 ? 'h1' : 'h2';
  return (
    <Tag id={id} className={cx(styles.title, styles[`title_level_${level}`], className)}>
      {children}
    </Tag>
  );
}
