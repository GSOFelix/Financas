import { useState } from 'react';

export default function DashBoard() {
  const [lancamentos, setLancamentos] = useState([]);
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Financeiro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#22c55e]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Saldo Atual</p>
                <h3 className="text-2xl font-bold" id="currentBalance">
                  R$ 0,00
                </h3>
              </div>

              <div className="bg-[#dcfce7] p-2 rounded-full">
                <i className="fas fa-wallet text-[#16a34a]"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
