import { useMemo, useState } from 'react';
import Button from '../../components/Button/Button';
import CategoryChips from '../../components/CategoryChips/CategoryChips';
import Container from '../../components/Container/Container';
import DishList from '../../components/DishList/DishList';
import Drawer from '../../components/Drawer/Drawer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import Icon from '../../components/Icon/Icon';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SortSelect from '../../components/SortSelect/SortSelect';
import dishes from '../../data/dishes';
import { emptyFilters } from '../../data/filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { countFilters, filterDishes, sortDishes } from '../../utils/menu';
import { plural } from '../../utils/format';
import styles from './MenuPage.module.css';

export default function MenuPage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState('popular');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const result = useMemo(() => sortDishes(filterDishes(dishes, filters), sort), [filters, sort]);
  const active = countFilters(filters);

  const applyFromDrawer = (next) => {
    setFilters(next);
    setDrawerOpen(false);
  };

  return (
    <Container className={styles.menu}>
      {isDesktop && (
        <aside className={styles.menu__aside}>
          <FilterPanel value={filters} onApply={setFilters} titleId="filters-desktop" />
        </aside>
      )}

      <div className={styles.menu__content}>
        <SectionTitle level={1} className={styles.menu__title}>
          Меню
        </SectionTitle>

        <div className={styles.menu__toolbar}>
          <SortSelect value={sort} onChange={setSort} />
          <CategoryChips
            value={filters.categories}
            onChange={(categories) => setFilters((prev) => ({ ...prev, categories }))}
            className={styles.menu__chips}
          />
          {!isDesktop && (
            <button
              type="button"
              className={styles['menu__filter-button']}
              aria-label={active ? `Фильтры, выбрано: ${active}` : 'Фильтры'}
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="filter" className={styles['menu__filter-icon']} />
              {active > 0 && <span className={styles['menu__filter-count']}>{active}</span>}
            </button>
          )}
        </div>

        <p className="visually-hidden" role="status">
          {result.length
            ? `Найдено ${result.length} ${plural(result.length, ['блюдо', 'блюда', 'блюд'])}`
            : 'Ничего не нашлось'}
        </p>

        {result.length ? (
          <DishList dishes={result} layout="grid" label="Блюда" className={styles.menu__list} />
        ) : (
          <div className={styles.menu__empty}>
            <p>Попробуйте убрать часть фильтров или изменить запрос.</p>
            <Button variant="green" size="small" onClick={() => setFilters(emptyFilters)}>
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      {!isDesktop && (
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} labelledBy="filters-mobile">
          <FilterPanel
            value={filters}
            onApply={applyFromDrawer}
            withCategories
            onClose={() => setDrawerOpen(false)}
            titleId="filters-mobile"
            className={styles.menu__drawer}
          />
        </Drawer>
      )}
    </Container>
  );
}
