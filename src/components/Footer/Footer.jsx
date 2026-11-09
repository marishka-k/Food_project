import { footerLinks, footerTitle } from '../../data/navigation';
import { disclaimer } from '../../data/content';
import styles from './Footer.module.css';

// Подвал: «О компании» и пометка об учебном проекте
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div>
          <h2 className={styles.footer__title}>{footerTitle}</h2>
          <ul className={styles.footer__list}>
            {footerLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className={styles.footer__note}>{disclaimer}</p>
      </div>
    </footer>
  );
}
