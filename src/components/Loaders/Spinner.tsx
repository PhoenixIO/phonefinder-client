import styles from './Spinner.module.scss';

export function SpinnerLoader() {
  return <div className={styles.spinner}><div></div><div></div><div></div><div></div></div>;
}
