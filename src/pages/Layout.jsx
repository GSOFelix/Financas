import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
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
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg bg-[#171717] text-[#4ade80]"
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-[#171717] hover:text-white"
          >
            <i className="fas fa-chart-line"></i>
            <span>Relatórios</span>
          </a>
        </nav>

        <div className="mt-auto pt-4 border-t border-[#262626] hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
