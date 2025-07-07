import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions";

export default function NewList() {
  const { buscarLancamentos } = useFireBaseActions();
  const [Lancamentos, setLancamentos] = useState([]);

  useEffect(() => {
    buscarLancamentos((todosLancamentos) => {
      const ordenadosPorData = todosLancamentos
        .filter((lan) => lan.data?.toDate)
        .sort((a, b) => b.data.toDate() - a.data.toDate());

      const ultimos10 = ordenadosPorData.slice(0, 10);
      setLancamentos(ultimos10);
    });
  }, []);

  const formatCurrency = (value) =>
    parseFloat(value).toFixed(2).replace(".", ",");

  const formatDate = (dateObj) =>
    dateObj?.toDate().toLocaleDateString("pt-BR");

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-gray-900 text-white px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-semibold flex items-center">
            <i className="fas fa-exchange-alt mr-2"></i>
            Transações Recentes
          </h3>
          <div className="text-sm text-gray-300 flex items-center">
            <span className="hidden sm:inline">últimas</span>
            <span className="bg-gray-700 px-2 py-1 rounded-md ml-1">
              {Lancamentos.length} transações
            </span>
          </div>
        </div>

        {/* Cards Mobile Sem Botões */}
<div className="p-4 space-y-4 md:hidden">
  {Lancamentos.length > 0 ? (
    Lancamentos.map((lan) => {
      const isReceita = lan.tipo === 'C';
      return (
        <div
          key={lan.id}
          className={`rounded-lg p-4 shadow-md ${
            isReceita ? 'bg-green-50' : 'bg-red-50'
          } transition-all`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{lan.descricao}</h4>
              <p className="text-sm text-gray-500">
                {typeof lan.categoria === 'string' ? lan.categoria : 'Categoria'}
              </p>
            </div>
            <span className={`text-sm font-medium ${isReceita ? 'text-green-600' : 'text-red-600'}`}>
              {isReceita ? 'Receita' : 'Despesa'}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <div>
              <span className="font-medium">Data:</span>{' '}
              {lan.data?.toDate().toLocaleDateString('pt-BR')}
            </div>
            <div>
              <span className="font-medium">Valor:</span>{' '}
              <span className={isReceita ? 'text-green-600' : 'text-red-600'}>
                R$ {parseFloat(lan.valor).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-center text-gray-500 text-sm">
      Nenhuma transação encontrada
    </div>
  )}
</div>


        {/* Desktop View (Tabela) */}
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
              {Lancamentos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="rounded-lg p-6 inline-block bg-gradient-to-r from-gray-100 to-gray-200">
                      <i className="fas fa-wallet text-gray-400 text-4xl mb-3"></i>
                      <p className="text-gray-500 font-medium">
                        Nenhuma transação encontrada
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Adicione sua primeira transação
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                Lancamentos.map((lan) => {
                  const isReceita = lan.tipo === "C";
                  return (
                    <tr
                      key={lan.id}
                      className={`${
                        isReceita ? "bg-green-50" : "bg-red-50"
                      } hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <i
                              className={`fas ${
                                isReceita
                                  ? "fa-arrow-down text-green-500"
                                  : "fa-arrow-up text-red-500"
                              }`}
                            ></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lan.descricao}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof lan.categoria === "string"
                          ? lan.categoria
                          : "Categoria"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lan.data)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span
                          className={`${
                            isReceita ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          R$ {formatCurrency(lan.valor)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            isReceita
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isReceita ? "Receita" : "Despesa"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
