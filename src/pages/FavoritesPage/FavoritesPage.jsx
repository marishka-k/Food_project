import Container from '../../components/Container/Container';
import DishList from '../../components/DishList/DishList';
import EmptyState from '../../components/EmptyState/EmptyState';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { dishById } from '../../data/dishes';
import { useStore } from '../../store/StoreContext';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const { favorites } = useStore();
  const list = favorites.map((id) => dishById[id]).filter(Boolean);

  return (
    <Container className={styles.favorites}>
      <SectionTitle level={1} className={styles.favorites__title}>
        Избранное
      </SectionTitle>
      {list.length ? (
        <DishList dishes={list} layout="wide" label="Избранные блюда" />
      ) : (
        <EmptyState title="Здесь пока пусто" text="Нажмите на сердечко на фото блюда, и оно появится в избранном." />
      )}
    </Container>
  );
}
