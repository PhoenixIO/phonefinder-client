import { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const tabs = [
  { 
    name: 'Ідея',
    id: 'vision',
    content: (
      <div>
        <h1>Ідея</h1>
      </div>
    ),
  },
  { 
    name: 'Концепція',
    id: 'concept',
    content: (
      <div>
        <h1>Концепція</h1>
      </div>
    ),
  },
  { 
    name: 'Використання',
    id: 'use',
    content: (
      <div>
        <h1>Використовуй</h1>
        <Link to='/login'>sdsaasd</Link>
      </div>
    ),
  },
];

export function Main() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(true);

  const handleScroll = () => {
    setMenuOpen(false);
    setStickyHeader(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    setStickyHeader(false);
  };

  const onLinkClick = (event: any, id: string) => {
    event.preventDefault();

    const targetElement = document.querySelector('#' + id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
    setMenuOpen(false);
    setStickyHeader(true);
  };

  return (
    <div className={styles.main}>
      <header className={clsx(stickyHeader && styles.sticky)}>
        <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 714.6 401.1">
          <path fill="#fff" fillRule="evenodd" d="M502.8 0h211.8l-23 39.7-138.5 240L483 401H342.7L413 279.6 251.4 0h140.3L483 158.1 538.6 62 502.8 0Zm-201 279.6L140.1 0H0l231.7 401 70-121.4Z"/>
        </svg>

        <nav>
          {tabs.map((tab) => <a key={tab.id} href={'#' + tab.id} onClick={(e) => onLinkClick(e, tab.id)}>{tab.name}</a>)}
          <button onClick={openMenu}>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div className={clsx(styles.page, menuOpen && styles.menuOpen)}>
        {tabs.map(tab => {
          return (
            <section key={tab.id} id={tab.id}>
              {tab.content}
            </section>
          );
        })}
      </div>
    </div>
  );
}
