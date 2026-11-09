import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import DishSection from '../../components/DishSection/DishSection';
import Gallery from '../../components/Gallery/Gallery';
import Price from '../../components/Price/Price';
import QuantityControl from '../../components/QuantityControl/QuantityControl';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { categoryLabel } from '../../data/categories';
import { dishById } from '../../data/dishes';
import { useStore } from '../../store/StoreContext';
import { plural } from '../../utils/format';
import styles from './DishPage.module.css';

export default function DishPage() {
  const { id } = useParams();
  const dish = dishById[id];
  const { addToHistory, getQty, setQty, addToCart } = useStore();

  // Запоминаем просмотр для блока «Недавно смотрели»
  useEffect(() => {
    if (dish) addToHistory(dish.id);
  }, [dish, addToHistory]);

  if (!dish) return <NotFoundPage />;

  const qty = getQty(dish.id);
  const { protein, fat, carbs } = dish.nutrition;
  const pairings = dish.pairings.map((pairId) => dishById[pairId]).filter(Boolean);

  return (
    <>
      <Container as="article" className={styles.dish}>
        <SectionTitle level={1} className={styles.dish__title}>
          {dish.name}
        </SectionTitle>

        <div className={styles.dish__layout}>
          <Gallery dish={dish} />

          <div className={styles.dish__info}>
            <p>
              <b>Время приготовления:</b> {dish.time} {plural(dish.time, ['минута', 'минуты', 'минут'])}
            </p>
            <p>{dish.description}</p>
            <p>
              <b>Состав:</b>
              <br />
              {dish.composition}
            </p>
            <p className={styles.dish__category}>
              <b>Категория блюда:</b> {categoryLabel[dish.category]}
            </p>
            <p className={styles.dish__nutrition}>
              <b>
                Пищевая ценность на порцию ({dish.weight}
                {dish.unit}):
              </b>
              <br />
              {dish.kcal} ккал, белки: {protein} г, жиры: {fat} г, углеводы: {carbs} г
            </p>

            <div className={styles.dish__buy}>
              <Price value={dish.price} prefix="Цена:" className={styles.dish__price} />
              {qty > 0 ? (
                <QuantityControl name={dish.name} qty={qty} size="large" onChange={(value) => setQty(dish.id, value)} />
              ) : (
                <Button className={styles.dish__button} onClick={() => addToCart(dish.id)}>
                  В корзину
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <DishSection title="К этому блюду подходят" dishes={pairings} />
      </Container>
    </>
  );
}
