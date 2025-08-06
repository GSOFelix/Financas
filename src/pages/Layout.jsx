import React, { useState } from 'react';
import { Link, Outlet,useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useAuth();
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside
        className="bg-[#0a0a0a] text-white w-full md:w-64 p-4 md:min-h-screen"
        style={{
          '--color-primary-400': '#4ade80',
          '--color-primary-500': '#22c55e',
          '--color-dark-800': '#171717',
          '--color-dark-900': '#0a0a0a',
          '--color-dark-700': '#262626',
        }}
      >
        <div className="flex items-center justify-between md:justify-center md:flex-col mb-8">
          <h1 className="text-2xl font-bold text-[#4ade80]">
            Finanças<span className="text-white">Pessoais</span>
          </h1>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            id="sidebarToggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <nav className={`space-y-2 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
          <Link
            to="/home"
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              isActive('/') ? 'bg-[#171717] text-[#4ade80]' : 'text-gray-300 hover:bg-[#171717] hover:text-white'
            }`}
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
          <Link
            to="/relatorios"
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              isActive('/relatorios') ? 'bg-[#171717] text-[#4ade80]' : 'text-gray-300 hover:bg-[#171717] hover:text-white'
            }`}
          >
            <i className="fas fa-chart-line"></i>
            <span>Relatórios</span>
          </Link>
        </nav>
        {/* Removida a classe hidden md:block */}
        <div className="mt-4 md:mt-auto pt-4 border-t border-[#262626]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user?.displayName || 'User profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#22c55e] flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user?.displayName?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
          
            <div>
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            className="mt-4 w-full flex items-center justify-between p-2 rounded-lg 
                    text-gray-300 hover:text-[#4ade80] transition-colors duration-200
                    hover:bg-[#171717]"
            onClick={handleLogout}
          >
            <span className="font-medium">Sair</span>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
  </div>
  );
}
