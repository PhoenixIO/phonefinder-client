import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as api from '../../api';
import { setAccount } from '../../redux/account/slice'

import styles from './Login.module.scss';

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: any) => {
    e.preventDefault();

    api.post(`${api.endpoint}/auth/login`, { email, password }, (data: any) => {
      const { user } = data;
      if (user) {
        toast('Ви ввійшли до акаунту!', { type: 'success' });
        dispatch(setAccount(user));
        navigate('/cabinet');
      } else {
        toast(data.message, { type: 'error' });
      }
    });
  };

  return (
    <div className={styles.login}>
      <Form className={styles.form}>
        <div className={styles.title}>Вхід</div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ваш E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введіть E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Не виходити" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center align-items-center" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit" className={styles.submit} onClick={onLogin}>
            Ввійти
          </Button>
          <Link to="/register">
            Зареєструватись
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}
