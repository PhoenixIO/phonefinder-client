import { useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { Main } from './pages/Main/Main';
import { Auth } from './pages/Auth/Auth';
import { Cabinet } from './pages/Cabinet/Cabinet';
import { Reviews } from './pages/Cabinet/Reviews';
import main from './background/main.json';

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
}, []);

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
