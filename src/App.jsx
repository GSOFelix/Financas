import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
