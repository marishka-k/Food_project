import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import EmptyState from '../../components/EmptyState/EmptyState';
import RepeatOrderButton from '../../components/RepeatOrderButton/RepeatOrderButton';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { dishById } from '../../data/dishes';
import { useStore } from '../../store/StoreContext';
import { formatPrice } from '../../utils/format';
import styles from './ProfilePage.module.css';

// Личный кабинет (демо): последний заказ и кнопка «Повторить»
export default function ProfilePage() {
  const { lastOrder } = useStore();
  const navigate = useNavigate();

  return (
    <Container className={styles.profile}>
      <SectionTitle level={1} className={styles.profile__title}>
        Личный кабинет
      </SectionTitle>

      {lastOrder ? (
        <section className={styles.profile__order} aria-labelledby="last-order">
          <h2 id="last-order" className={styles['profile__order-title']}>
            Заказ №{lastOrder.number}
          </h2>
          <p className={styles.profile__status}>
            Готовится · доставка {lastOrder.day === 'завтра' ? 'завтра ' : ''}
            {lastOrder.slot}
          </p>
          <ul className={styles.profile__items}>
            {lastOrder.items
              .filter(({ id }) => dishById[id])
              .map(({ id, qty }) => (
                <li key={id} className={styles.profile__item}>
                  <span>{dishById[id].name}</span>
                  <span>× {qty}</span>
                </li>
              ))}
          </ul>
          {lastOrder.total ? <p className={styles.profile__total}>Итого: {formatPrice(lastOrder.total)}</p> : null}
          <RepeatOrderButton onRepeat={() => navigate('/cart')} />
        </section>
      ) : (
        <EmptyState
          title="Заказов пока нет"
          text="Здесь появится ваш последний заказ — его можно будет повторить в один клик."
        />
      )}
    </Container>
  );
}
