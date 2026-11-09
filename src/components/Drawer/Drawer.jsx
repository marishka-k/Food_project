import { createPortal } from 'react-dom';
import useDialog from '../../hooks/useDialog';
import styles from './Drawer.module.css';

// Выезжающая справа панель (фильтры на мобильной): фокус внутри, Escape и клик по фону закрывают
export default function Drawer({ isOpen, onClose, labelledBy, children }) {
  const panelRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.drawer} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={styles.drawer__panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
