import { useState,useEffect } from 'react';
import { useFireBaseActions } from '../hooks/useFirebaseActions';

export default function DashBoard() {
  const {buscarLancamentos} = useFireBaseActions();
  const [totalCarteira, setTotalCarteira] = useState(0.00);
  const [totalCredito,setTotalCredito] = useState(0.00);
  const [totalDebito,setTotalDebito] = useState(0.00);

  useEffect(() => {
    buscarLancamentos((lancamentos) => {
      let total = 0;
      let credito = 0;
      let debito = 0;

      lancamentos.forEach((item) => {
        const valor = parseFloat(item.valor); // valor precisa estar como número
        if (item.tipo === 'C'){
          total += valor;
          credito += valor;
        }
        else if (item.tipo === 'D'){
          total -= valor;
          debito += valor;
        } 
      });

      setTotalCarteira(total);
      setTotalCredito(credito);
      setTotalDebito(debito);
    });


  }, []);

  
  

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
                  R${totalCarteira.toFixed(2).replace('.', ',')}
                </h3>
              </div>

              <div className="bg-[#dcfce7] p-2 rounded-full">
                <i className="fas fa-wallet text-[#16a34a]"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div class="flex justify-between items-start">
              <div>
                  <p class="text-gray-500 text-sm">Total Receitas</p>
                  <h3 class="text-2xl font-bold text-green-600" id="totalIncome">R${totalCredito.toFixed(2).replace('.', ',')}</h3>
              </div>
              <div class="bg-green-100 p-2 rounded-full">
                <i class="fas fa-arrow-up text-green-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm">Total Despesas</p>
                <h3 class="text-2xl font-bold text-red-600" id="totalExpense">R${totalDebito.toFixed(2).replace('.', ',')}</h3>
              </div>
              <div class="bg-red-100 p-2 rounded-full">
                <i class="fas fa-arrow-down text-red-600"></i>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}
