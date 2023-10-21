import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../api';
import { setAccount } from '../../redux/account/slice'

import './Auth.scss';

export function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onLogin = (e: any) => {
    e.preventDefault();
    console.log('login: ', email, password);

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
  const onRegister = (e: any) => {
    e.preventDefault();
    console.log('register: ', email, password, repeatPassword);

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
    <div className="auth">
      <div className="section">
          <div className="container">
              <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                      <div className="section pb-5 pt-5 pt-sm-2 text-center">
                          <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                          <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                          <label htmlFor="reg-log"></label>
                          <div className="card-3d-wrap mx-auto">
                              <div className="card-3d-wrapper">
                                  <div className="card-front">
                                      <div className="center-wrap">
                                          <div className="section text-center">
                                              <h4 className="mb-4 pb-3">Log In</h4>
                                              <div className="form-group">
                                                  <input type="email" name="login_email" className="form-style"
                                                      placeholder="Your Email" id="login_email" autoComplete="off"
                                                      onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                  <i className="input-icon uil uil-at"></i>
                                              </div>
                                              <div className="form-group mt-2">
                                                  <input type="password" name="login_password" className="form-style"
                                                      placeholder="Your Password" id="login_password" autoComplete="off"
                                                      onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                  <i className="input-icon uil uil-lock-alt"></i>
                                              </div>
                                              <a href="#" className="btn mt-4" onClick={onLogin}>submit</a>
                                              <p className="mb-0 mt-4 text-center">
                                                <a href="#0" className="link">Forgot your password?</a>
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="card-back">
                                      <div className="center-wrap">
                                          <div className="section text-center">
                                              <h4 className="mb-4 pb-3">Sign Up</h4>
                                              <div className="form-group mt-2">
                                                  <input type="email" name="reg_email" className="form-style"
                                                      placeholder="Your Email" id="reg_email" autoComplete="off"
                                                      onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                  <i className="input-icon uil uil-at"></i>
                                              </div>
                                              <div className="form-group mt-2">
                                                <input type="password" name="reg_password" className="form-style"
                                                    placeholder="Your Password" id="reg_password" autoComplete="off"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                  />
                                                  <i className="input-icon uil uil-lock-alt"></i>
                                              </div>
                                              <div className="form-group mt-2">
                                                <input type="password" name="reg_password_repeat" className="form-style"
                                                    placeholder="Repeat Password" id="reg_password_repeat" autoComplete="off"
                                                    onChange={(e) => setRepeatPassword(e.target.value)}  
                                                  />
                                                  <i className="input-icon uil uil-lock-alt"></i>
                                              </div>
                                              <a className="btn mt-4" onClick={onRegister}>submit</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
