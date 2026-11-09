import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import useDialog from '../../hooks/useDialog';
import { cx } from '../../utils/cx';
import styles from './Modal.module.css';

// Модальное окно: крестик, Escape и клик по фону закрывают; фокус держится внутри.
// size: large — окно «Заказ оформлен», small — короткие пояснения
export default function Modal({ isOpen, onClose, labelledBy, size = 'small', children }) {
  const dialogRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={cx(styles.modal__dialog, styles[`modal__dialog_size_${size}`])}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        <button type="button" className={styles.modal__close} aria-label="Закрыть" onClick={onClose}>
          <Icon name="close" className={styles['modal__close-icon']} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
