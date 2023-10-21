import clsx from 'clsx';
import styles from './Loader.module.scss';

export function Loader({ className = '' }) {
  return (
    <span className={clsx(styles.loader, className)}></span>
  );
}
