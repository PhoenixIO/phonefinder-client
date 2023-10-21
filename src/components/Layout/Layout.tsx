import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { clearAccount, setAccount } from '../../redux/account/slice'
import { selectEmail } from '../../redux/account/selector';
import * as api from '../../api';

import styles from './Layout.module.scss';
import { Loader } from '../Loaders/Loader';

interface LayoutProps {
  children: ReactNode;
  authGuard?: boolean;
}

export function Layout({ children, authGuard = false }: LayoutProps) {
  const dispatch = useDispatch();
  const authorized = useSelector(selectEmail) !== '';
  const [authRequested, setAuthRequested] = useState(false);
  
  useEffect(() => api.get(`${api.endpoint}/user/account`, (data) => {
    if (data.email) {
      dispatch(setAccount(data));
    } else {
      dispatch(clearAccount());
    }
    setAuthRequested(true);
  }), []);

  return (
    <div className={styles.layout}>
      <Header authorized={authorized} />
      <div className={styles.children}>
        {authGuard && (!authRequested || !authorized) && (
          <Loader className={!authorized ? styles.notAuthorized : ''} />
        )}
        {(!authGuard || authorized) && children}
      </div>
    </div>
  );
}
