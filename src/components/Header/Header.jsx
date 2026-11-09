import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import MobileNav from '../MobileNav/MobileNav';
import RepeatOrderButton from '../RepeatOrderButton/RepeatOrderButton';
import navigation from '../../data/navigation';
import { brand } from '../../data/content';
import { useStore } from '../../store/StoreContext';
import { cartLines, itemsCount } from '../../utils/order';
import { asset } from '../../utils/asset';
import { cx } from '../../utils/cx';
import styles from './Header.module.css';

// Шапка: на главной — прозрачная поверх первого экрана, на остальных страницах — светлая плашка
export default function Header({ transparent = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, favorites } = useStore();
  const navigate = useNavigate();
  const count = itemsCount(cartLines(cart));

  const navClass = ({ isActive }) => cx(styles.header__link, isActive && styles.header__link_active);
  const iconClass = ({ isActive }) => cx(styles.header__icon, isActive && styles.header__icon_active);

  return (
    <header className={cx(styles.header, transparent ? styles.header_transparent : styles.header_filled)}>
      <div className={styles.header__inner}>
        <Link className={styles.header__logo} to="/" aria-label={`${brand} — на главную`}>
          <img src={asset('images/logo.svg')} alt="" width="80" height="50" />
        </Link>

        <RepeatOrderButton className={styles.header__repeat} onRepeat={() => navigate('/cart')} />

        <nav className={styles.header__nav} aria-label="Основное меню">
          <ul className={styles.header__list}>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink className={navClass} to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__icons}>
          <NavLink className={iconClass} to="/favorites" aria-label={`Избранное: ${favorites.length}`}>
            <Icon name="heart" className={styles['header__icon-svg']} />
          </NavLink>
          <NavLink className={iconClass} to="/cart" aria-label={`Корзина: ${count}`}>
            <Icon name="cart" className={styles['header__icon-svg']} />
            {count > 0 && (
              <span className={styles.header__count} aria-hidden="true">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </NavLink>
          <NavLink className={iconClass} to="/profile" aria-label="Личный кабинет">
            <Icon name="profile" className={cx(styles['header__icon-svg'], styles['header__icon-svg_type_profile'])} />
          </NavLink>
          <button
            type="button"
            className={cx(styles.header__icon, styles.header__burger)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="burger" className={styles['header__icon-svg']} />
          </button>
        </div>
      </div>

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
