import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import DashBoard from './pages/DashBoard';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path='home' element={<DashBoard/>}/>
            <Route path='relatorios' element={<Relatorios/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
