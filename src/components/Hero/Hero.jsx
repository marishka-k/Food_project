import Button from '../Button/Button';
import { hero } from '../../data/content';
import { asset } from '../../utils/asset';
import styles from './Hero.module.css';

// Первый экран главной: зелёное пятно, тарелка и кнопка «В меню»
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.hero__inner}>
        <img className={styles.hero__blob} src={asset('images/hero-blob.svg')} alt="" width="803" height="804" />
        <img
          className={styles.hero__plate}
          src={asset('images/hero-plate.webp')}
          alt="Тарелка с тушёной говядиной и морковью"
          width="521"
          height="521"
          fetchpriority="high"
        />
        <div className={styles.hero__content}>
          <h1 id="hero-title" className={styles.hero__title}>
            {hero.title}
          </h1>
          <p className={styles.hero__text}>{hero.text}</p>
          <Button to="/menu" size="large" className={styles.hero__button}>
            {hero.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
