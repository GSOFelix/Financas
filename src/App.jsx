import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import DashBoard from './pages/DashBoard';
import Relatorios from './pages/Relatorios';
import Login from './pages/Login';
import { AuthProvider } from './context/authContext';
import { PrivateRoute } from './components/privateRoute';

function App() {
  return (
    <>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
        >
          <Route index element={<DashBoard />} />
          <Route path='home' element={<DashBoard/>}/>
          <Route path='relatorios' element={<Relatorios/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
    </>
  );
}

export default App;
