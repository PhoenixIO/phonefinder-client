import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as api from '../../api';

import styles from './Register.module.scss';

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onRegister = (e: any) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast('Паролі не співпадають :(', { type: 'error' });
      return;
    }

    api.post(`${api.endpoint}/auth/register`, { email, password }, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        toast('Ви успішно зареєструвались! Тепер увійдіть в акаунт', { type: 'success' });
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.register}>
      <Form className={styles.form}>
        <div className={styles.title}>Реєстрація</div>

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
          <Form.Label>Придумайте надійний пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Повторіть пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex justify-content-center align-items-center" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit" className={styles.submit} onClick={onRegister}>
            Зареєструватись
          </Button>
          <Link to="/login">
            Ввійти
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}
