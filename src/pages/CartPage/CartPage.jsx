import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import Container from '../../components/Container/Container';
import DishSection from '../../components/DishSection/DishSection';
import EmptyState from '../../components/EmptyState/EmptyState';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { dishById, recommendedDishes } from '../../data/dishes';
import { homeSections } from '../../data/content';
import { useStore } from '../../store/StoreContext';
import { cartLines } from '../../utils/order';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { cart, history } = useStore();
  const lines = cartLines(cart);
  const recent = history.map((id) => dishById[id]).filter(Boolean).slice(0, 4);

  return (
    <Container className={styles.cart}>
      <SectionTitle level={1} className={styles.cart__title}>
        Корзина товаров
      </SectionTitle>

      {lines.length ? (
        <div className={styles.cart__layout}>
          <ul className={styles.cart__list} aria-label="Товары в корзине">
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </ul>
          <CartSummary lines={lines} />
        </div>
      ) : (
        <EmptyState
          title="Корзина пуста"
          text="Загляните в меню и добавьте блюда кнопкой «в корзину» — или повторите прошлый заказ кнопкой в шапке."
        />
      )}

      {recent.length ? (
        <DishSection title={homeSections.recent} dishes={recent} />
      ) : (
        <DishSection title={homeSections.recommended} dishes={recommendedDishes} />
      )}
    </Container>
  );
}
