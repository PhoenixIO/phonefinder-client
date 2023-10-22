import { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { Main } from './pages/Main/Main';
import { Auth } from './pages/Auth/Auth';
import { Cabinet } from './pages/Cabinet/Cabinet';
import { Reviews } from './pages/Cabinet/Reviews';
import main from './background/main.json';
import { clearAccount, setAccount, setAccountLoaded } from './redux/account/slice';
import * as api from './api';

function App() {
  const dispatch = useDispatch();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => api.get(`${api.endpoint}/user/account`, (data) => {
    if (data.email) {
      dispatch(setAccount(data));
    } else {
      dispatch(clearAccount());
    }
    dispatch(setAccountLoaded(true));
  }), []);

  return (
    <BrowserRouter>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        transition={Flip}
        theme='dark'
        closeOnClick
        draggable
      />
      <Particles init={particlesInit} options={main as any}/>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
