import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import styles from './Header.module.scss';

interface HeaderProps {
  authorized: boolean;
}

export function Header({ authorized }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.animation} />
        <Link to="/" className={styles.title}>NaParu</Link>
      </div>
      <div>
        {authorized ? (
          <Link to="/cabinet">
            <Button variant="light" className={styles.loginButton}>Особистий кабінет</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="light" className={styles.loginButton}>Вхід</Button>
          </Link>
        )}
      </div>
    </ header>
  );
}
