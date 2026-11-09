import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import categories from '../../data/categories';
import { features, ingredients } from '../../data/filters';
import { cx } from '../../utils/cx';
import styles from './FilterPanel.module.css';

const toggle = (list, id, on) => (on ? [...list, id] : list.filter((x) => x !== id));

// Панель фильтров. Изменения копятся в черновике и применяются кнопкой «Применить».
// На десктопе — колонка слева, на мобильной — выезжающая панель (withCategories, onClose)
export default function FilterPanel({ value, onApply, withCategories = false, onClose, titleId, className }) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(draft);
  };

  const groups = [
    withCategories && { key: 'categories', title: 'Категория', options: categories },
    { key: 'ingredients', title: 'Основной ингредиент', options: ingredients },
    { key: 'features', title: 'Особенности', options: features },
  ].filter(Boolean);

  return (
    <form className={cx(styles.filter, className)} onSubmit={handleSubmit} role="search" aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.filter__title}>
        Фильтры
      </h2>
      {onClose && (
        <button type="button" className={styles.filter__close} aria-label="Закрыть фильтры" onClick={onClose}>
          <Icon name="close" className={styles['filter__close-icon']} />
        </button>
      )}

      {groups.map((group) => (
        <fieldset key={group.key} className={styles.filter__group}>
          <legend className={styles.filter__legend}>{group.title}</legend>
          <ul className={styles.filter__options}>
            {group.options.map((option) => (
              <li key={option.id}>
                <Checkbox
                  checked={draft[group.key].includes(option.id)}
                  onChange={(on) => setDraft((prev) => ({ ...prev, [group.key]: toggle(prev[group.key], option.id, on) }))}
                >
                  {option.label}
                </Checkbox>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}

      <div className={styles.filter__group}>
        <label className={styles.filter__legend} htmlFor={`${titleId}-search`}>
          Поиск по названию
        </label>
        <input
          id={`${titleId}-search`}
          className={styles.filter__search}
          type="search"
          placeholder="Введите текст"
          value={draft.search}
          onChange={(event) => setDraft((prev) => ({ ...prev, search: event.target.value }))}
        />
      </div>

      <Button type="submit" variant="green" size="small" className={styles.filter__apply}>
        Применить
      </Button>
    </form>
  );
}
