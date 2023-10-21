import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

export function Modal({ close, children, className = '' }: any) {
  return (
    <div className={clsx(styles.modal, className)}>
      <div role="button" className={styles.close} onClick={close}>
        <FontAwesomeIcon icon={faClose} />
      </div>
      {children}
    </div>
  );
}
