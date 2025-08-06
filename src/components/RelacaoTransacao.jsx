import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions"
import Swal from 'sweetalert2';
import { useAuth } from "../context/authContext";

export default function RelacaoTransacao({input,mes,ano,categoria,tipo,onEdit,DeletarLancamento}){
  const {user} = useAuth(); 
  const {buscarLancamentos} = useFireBaseActions(user);
    const [Lancamentos,setLancamentos] = useState([]);
    
    const handleDelete = (id) => {
        Swal.fire({
          title: 'Tem certeza?',
          text: 'Esta ação não poderá ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#22c55e',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            DeletarLancamento(id);
            Swal.fire('Deletado!', 'O lançamento foi removido.', 'success');
          }
        });
      };

    useEffect(() => {
        buscarLancamentos((todosLancamentos) => {
          const filtrados = todosLancamentos.filter((lan) => {
            const data = lan.data?.toDate();
            const mesNome = data?.toLocaleDateString('pt-BR', { month: 'long' });
            const anoLancamento = data?.getFullYear();
      
            const matchCategoria =
                !categoria || lan.categoria === categoria;
      
            const matchMes =
              !mes || mesNome?.toLowerCase() === mes.toLowerCase();
            
            const matchAno = 
              !ano || anoLancamento.toString() === ano;

            const matchTipo =
              !tipo || lan.tipo === tipo;
      
              const matchDescricao =
              !input ||
              lan.descricao?.toLowerCase().includes(input.toLowerCase());
      
            return matchCategoria && matchMes && matchAno && matchTipo && matchDescricao;
          });
      
          setLancamentos(filtrados);
        });
      }, [,input,mes, categoria, tipo]);


    return(
        <div className="bg-white rounded-lg shadow overflow-hidden">
  {/* Cabeçalho */}
  <div className="bg-[#171717] text-white px-4 py-3 flex justify-between items-center">
    <h3 className="text-base font-semibold">Relação de Transações</h3>
  </div>

  {/* Cards Mobile */}
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
                R$ {parseFloat(lan.valor).toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className="mt-3 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(lan)}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3 py-1 rounded-md text-sm flex items-center"
              >
                <i className="fas fa-edit mr-1"></i> Editar
              </button>
              <button
                onClick={() => handleDelete(lan.id)}
                className="bg-[#262626] hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center border border-red-500"
              >
                <i className="fas fa-trash mr-1"></i> Deletar
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center text-gray-500 text-sm">Nenhuma transação encontrada</div>
    )}
  </div>

  {/* Tabela Desktop */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Descrição
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Categoria
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Data
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Valor
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tipo
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ação
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Lancamentos.length > 0 ? (
          Lancamentos.map((lan) => (
            <tr key={lan.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{lan.descricao}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {typeof lan.categoria === 'string' ? lan.categoria : 'Categoria'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {lan.data?.toDate().toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                R$ {parseFloat(lan.valor).toFixed(2).replace('.', ',')}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                {lan.tipo === 'C' ? (
                  <span className="text-green-600">Receita</span>
                ) : (
                  <span className="text-red-600">Despesa</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => onEdit(lan)}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3 py-1 rounded-md text-sm flex items-center"
                  >
                    <i className="fas fa-edit mr-1"></i> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lan.id)}
                    className="bg-[#262626] hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm border border-red-500 flex items-center"
                  >
                    <i className="fas fa-trash mr-1"></i> Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
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