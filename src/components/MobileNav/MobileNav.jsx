import { createPortal } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import RepeatOrderButton from '../RepeatOrderButton/RepeatOrderButton';
import navigation from '../../data/navigation';
import useDialog from '../../hooks/useDialog';
import { cx } from '../../utils/cx';
import styles from './MobileNav.module.css';

// Выезжающее меню мобильной версии (бургер в шапке)
export default function MobileNav({ isOpen, onClose }) {
  const panelRef = useDialog(isOpen, onClose);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const linkClass = ({ isActive }) => cx(styles['mobile-nav__link'], isActive && styles['mobile-nav__link_active']);

  return createPortal(
    <div className={styles['mobile-nav']} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        id="mobile-nav"
        className={styles['mobile-nav__panel']}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        tabIndex={-1}
      >
        <button type="button" className={styles['mobile-nav__close']} aria-label="Закрыть меню" onClick={onClose}>
          <Icon name="close" className={styles['mobile-nav__close-icon']} />
        </button>
        <nav aria-label="Основное меню">
          <ul className={styles['mobile-nav__list']}>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink className={linkClass} to={item.to} end={item.end} onClick={onClose}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink className={linkClass} to="/favorites" onClick={onClose}>
                избранное
              </NavLink>
            </li>
            <li>
              <NavLink className={linkClass} to="/profile" onClick={onClose}>
                личный кабинет
              </NavLink>
            </li>
          </ul>
        </nav>
        <RepeatOrderButton
          onRepeat={() => {
            onClose();
            navigate('/cart');
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
