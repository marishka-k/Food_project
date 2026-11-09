import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { deliveryCards, deliveryNotes } from '../../data/delivery';
import styles from './DeliveryPage.module.css';

// Условия доставки — кратко, в стиле карточек сайта
export default function DeliveryPage() {
  return (
    <Container className={styles.delivery}>
      <SectionTitle level={1} className={styles.delivery__title}>
        Доставка
      </SectionTitle>

      <ul className={styles.delivery__cards}>
        {deliveryCards.map((card) => (
          <li key={card.title} className={styles.delivery__card}>
            <h2 className={styles['delivery__card-title']}>{card.title}</h2>
            <p>{card.text}</p>
          </li>
        ))}
      </ul>

      <section className={styles.delivery__notes} aria-labelledby="delivery-notes">
        <h2 id="delivery-notes" className={styles['delivery__notes-title']}>
          Полезно знать
        </h2>
        <ul className={styles.delivery__list}>
          {deliveryNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <Button to="/menu" size="large" className={styles.delivery__button}>
        В меню
      </Button>
    </Container>
  );
}
