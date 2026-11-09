import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import Container from '../../components/Container/Container';
import EmptyState from '../../components/EmptyState/EmptyState';
import OrderSuccess from '../../components/OrderSuccess/OrderSuccess';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useStore } from '../../store/StoreContext';
import { cartLines, deliverySlots, makeOrderNumber, orderTotals } from '../../utils/order';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { cart, promo, clearCart, setLastOrder } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card-online');
  const [placed, setPlaced] = useState(null);
  const slots = useMemo(() => deliverySlots(), []);

  const lines = cartLines(cart);
  const totals = orderTotals(lines, promo, payment);

  // Демо-отправка: сохраняем заказ как «прошлый», очищаем корзину и показываем окно «финал»
  const handleSubmit = ({ slot }) => {
    const order = {
      number: makeOrderNumber(),
      slot,
      day: slots.day,
      total: totals.total,
      date: new Date().toISOString(),
      items: lines.map(({ id, qty }) => ({ id, qty })),
    };
    setLastOrder(order);
    clearCart();
    setPlaced(order);
  };

  const closeSuccess = () => {
    setPlaced(null);
    navigate('/');
  };

  return (
    <Container className={styles.checkout}>
      <SectionTitle level={1} className={styles.checkout__title}>
        Оформление заказа
      </SectionTitle>

      {lines.length ? (
        <div className={styles.checkout__layout}>
          <OrderSummary lines={lines} totals={totals} promo={promo} />
          <CheckoutForm slots={slots} onPaymentChange={setPayment} onSubmit={handleSubmit} />
        </div>
      ) : (
        !placed && <EmptyState title="Оформлять пока нечего" text="Корзина пуста — добавьте блюда из меню." />
      )}

      <OrderSuccess order={placed} onClose={closeSuccess} />
    </Container>
  );
}
