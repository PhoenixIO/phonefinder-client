import { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import clsx from 'clsx';

export function Main() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);

  useEffect(() => {

  }, []);

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <div className={styles.main}>
      <header className={clsx(stickyHeader && styles.sticky)}>
        <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 714.6 401.1">
          <path fill="#fff" fillRule="evenodd" d="M502.8 0h211.8l-23 39.7-138.5 240L483 401H342.7L413 279.6 251.4 0h140.3L483 158.1 538.6 62 502.8 0Zm-201 279.6L140.1 0H0l231.7 401 70-121.4Z"/>
        </svg>

        <nav>
          <a href="#vision">Vision</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#space">Space</a>
          <a href="#future">Future</a>
          <button onClick={openMenu}>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div className={clsx(styles.page, menuOpen && styles.menuOpen)}>
        <section id="vision" style={{backgroundImage: 'url(https://assets.codepen.io/214624/vision.jpg)'}}>
          <h1>Vision.</h1>
        </section>
        <section id="knowledge" style={{backgroundImage: 'url(https://assets.codepen.io/214624/knowledge.jpg)'}}>
          <h1>Knowledge.</h1>
        </section>
        <section id="space" style={{backgroundImage: 'url(https://assets.codepen.io/214624/space.jpg)'}}>
          <h1>Space.</h1>
        </section>
        <section id="future" style={{backgroundImage: 'url(https://assets.codepen.io/214624/future.jpg)'}}>
          <h1>Future.</h1>
        </section>
      </div>
    </div>
  );
}
