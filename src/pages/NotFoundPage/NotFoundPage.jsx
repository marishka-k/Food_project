import Container from '../../components/Container/Container';
import EmptyState from '../../components/EmptyState/EmptyState';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <Container className={styles['not-found']}>
      <SectionTitle level={1} className={styles['not-found__title']}>
        Страница не найдена
      </SectionTitle>
      <EmptyState title="Такого блюда или страницы нет" text="Возможно, ссылка устарела. Загляните в меню." />
    </Container>
  );
}
