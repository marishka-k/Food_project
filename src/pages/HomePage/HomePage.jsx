import Container from '../../components/Container/Container';
import DishSection from '../../components/DishSection/DishSection';
import Hero from '../../components/Hero/Hero';
import { dishById, newDishes, popularDishes, recommendedDishes } from '../../data/dishes';
import { homeSections } from '../../data/content';
import { useStore } from '../../store/StoreContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { history } = useStore();
  const recent = history.map((id) => dishById[id]).filter(Boolean).slice(0, 4);

  return (
    <div className={styles.home}>
      <Hero />
      <Container>
        {recent.length ? (
          <DishSection title={homeSections.recent} dishes={recent} />
        ) : (
          <DishSection title={homeSections.recommended} dishes={recommendedDishes} />
        )}
        <DishSection title={homeSections.new} dishes={newDishes} />
        <DishSection title={homeSections.popular} dishes={popularDishes} />
      </Container>
    </div>
  );
}
