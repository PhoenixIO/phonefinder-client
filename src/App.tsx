import { useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { Main } from './pages/Main/Main';
import { Auth } from './pages/Auth/Auth';
import { Cabinet } from './pages/Cabinet/Cabinet';
import { Layout } from './components/Layout/Layout';
import { loadFull } from 'tsparticles';
import main from './background/main.json';

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
