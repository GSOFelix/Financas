import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions"

export default function ListTransaction(){
    const {buscarLancamentos} = useFireBaseActions();
    const [Lancamentos,setLancamentos] = useState([]);

    useEffect(() => {
        buscarLancamentos((todosLancamentos) => {
          const ordenadosPorData = todosLancamentos
            .filter(lan => lan.data?.toDate) // garante que tenha data válida
            .sort((a, b) => b.data.toDate() - a.data.toDate()); // mais recente primeiro
      
          const ultimos10 = ordenadosPorData.slice(0, 10); // pega os 10 primeiros
      
          setLancamentos(ultimos10);
          console.log('Últimos 10 lançamentos:', ultimos10);
        });
      }, []);


    return(
        <div className="bg-white rounded-lg shadow overflow-hidden">
  {/* Cabeçalho */}
  <div className="bg-[#171717] text-white px-4 py-3 flex justify-between items-center">
    <h3>Transações Recentes</h3>
    <div className="text-sm text-gray-300">
      <span className="ml-1">últimas 10</span> transações
    </div>
  </div>

  {/* Mobile View */}
  <div className="p-4 space-y-4 md:hidden">
    {Lancamentos.length > 0 ? (
      Lancamentos.map((lan) => (
        <div
          key={lan.id}
          className="border rounded-lg shadow-sm p-4 bg-gray-50 space-y-2"
        >
          <div>
            <strong>Descrição:</strong> {lan.descricao}
          </div>
          <div>
            <strong>Categoria:</strong>{' '}
            {typeof lan.categoria === 'string' ? lan.categoria : 'Categoria'}
          </div>
          <div>
            <strong>Data:</strong>{' '}
            {lan.data?.toDate().toLocaleDateString('pt-BR')}
          </div>
          <div>
            <strong>Valor:</strong> R${' '}
            {parseFloat(lan.valor).toFixed(2).replace('.', ',')}
          </div>
          <div>
            <strong>Tipo:</strong>{' '}
            {lan.tipo === 'C' ? (
              <span className="text-green-600">Receita</span>
            ) : (
              <span className="text-red-600">Despesa</span>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-sm text-gray-500">
        Nenhuma transação encontrada
      </div>
    )}
  </div>

  {/* Desktop View */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <i className="fas fa-align-left mr-1"></i> Descrição
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <i className="fas fa-tag mr-1"></i> Categoria
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <i className="fas fa-calendar-day mr-1"></i> Data
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <i className="fas fa-money-bill-wave mr-1"></i> Valor
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <i className="fas fa-exchange-alt mr-1"></i> Tipo
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Lancamentos.length > 0 ? (
          Lancamentos.map((lan) => (
            <tr key={lan.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lan.descricao}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {typeof lan.categoria === 'string'
                  ? lan.categoria
                  : 'Categoria'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lan.data?.toDate().toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                R$ {parseFloat(lan.valor).toFixed(2).replace('.', ',')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {lan.tipo === 'C' ? (
                  <span className="text-green-600">Receita</span>
                ) : (
                  <span className="text-red-600">Despesa</span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              Nenhuma transação encontrada
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    )
}