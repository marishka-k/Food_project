import { useEffect, useState } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Icon from '../Icon/Icon';
import { dishPhoto } from '../../utils/asset';
import { cx } from '../../utils/cx';
import styles from './Gallery.module.css';

// Фото блюда с лентой миниатюр и стрелками
export default function Gallery({ dish }) {
  const [index, setIndex] = useState(0);
  const { photos } = dish;

  useEffect(() => setIndex(0), [dish.id]);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__main}>
        <img
          className={styles.gallery__image}
          src={dishPhoto(photos[index])}
          alt={`${dish.name}, фото ${index + 1} из ${photos.length}`}
          width="900"
          height="700"
        />
        <FavoriteButton id={dish.id} name={dish.name} className={styles.gallery__favorite} />
      </div>

      <div className={styles.gallery__strip}>
        <button
          type="button"
          className={styles.gallery__arrow}
          aria-label="Предыдущее фото"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <Icon name="triangle-left" className={styles['gallery__arrow-icon']} />
        </button>
        <ul className={styles.gallery__thumbs}>
          {photos.map((photo, i) => (
            <li key={photo}>
              <button
                type="button"
                className={cx(styles.gallery__thumb, i === index && styles.gallery__thumb_active)}
                aria-label={`Фото ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
              >
                <img src={dishPhoto(photo)} alt="" width="88" height="60" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={cx(styles.gallery__arrow, styles.gallery__arrow_next)}
          aria-label="Следующее фото"
          disabled={index === photos.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          <Icon name="triangle-left" className={styles['gallery__arrow-icon']} />
        </button>
      </div>
    </div>
  );
}
