import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import QuantityControl from '../QuantityControl/QuantityControl';
import { useStore } from '../../store/StoreContext';
import { dishPhoto } from '../../utils/asset';
import styles from './CartItem.module.css';

// Строка корзины: фото, название, сумма по позиции, «− 1 +», урна
export default function CartItem({ line }) {
  const { setQty } = useStore();
  const { dish, qty } = line;

  return (
    <li className={styles['cart-item']}>
      <img className={styles['cart-item__image']} src={dishPhoto(dish.photos[0])} alt="" width="187" height="109" />
      <Link className={styles['cart-item__name']} to={`/dish/${dish.id}`}>
        {dish.name}
      </Link>
      <Price value={dish.price * qty} className={styles['cart-item__price']} />
      <QuantityControl
        name={dish.name}
        qty={qty}
        onChange={(value) => setQty(dish.id, value)}
        className={styles['cart-item__quantity']}
      />
    </li>
  );
}
