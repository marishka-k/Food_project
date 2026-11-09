import Modal from '../Modal/Modal';
import styles from './OrderSuccess.module.css';

// Окно «Заказ №… оформлен!» (макет «финал»)
export default function OrderSuccess({ order, onClose }) {
  return (
    <Modal isOpen={Boolean(order)} onClose={onClose} labelledBy="order-success-title" size="large">
      {order && (
        <div className={styles.success}>
          <h2 id="order-success-title" className={styles.success__title}>
            Заказ №{order.number} оформлен!
          </h2>
          <p className={styles.success__lead}>Мы уже передали заказ шеф-повару и скоро его начнут готовить</p>
          <p className={styles.success__time}>
            планируемое время доставки: {order.slot.replace(' - ', '-')}
            {order.day === 'завтра' ? ' (завтра)' : ''}
          </p>
          <p className={styles.success__note}>отследить заказ можно в личном кабинете</p>
        </div>
      )}
    </Modal>
  );
}
