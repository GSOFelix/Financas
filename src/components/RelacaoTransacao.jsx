import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions"
import Swal from 'sweetalert2';

export default function RelacaoTransacao({mes,categoria,tipo,onEdit,DeletarLancamento}){
    const {buscarLancamentos} = useFireBaseActions();
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
      
            const matchCategoria =
                !categoria || lan.categoria === categoria;
      
            const matchMes =
              !mes || mesNome?.toLowerCase() === mes.toLowerCase();
      
            const matchTipo =
              !tipo || lan.tipo === tipo;
      
            return matchCategoria && matchMes && matchTipo;
          });
      
          setLancamentos(filtrados);
        });
      }, [mes, categoria, tipo]);


    return(
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-[#171717] text-white px-4 py-3 flex justify-between items-center">
                <h3>Relaçao de Transações</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                        </tr>
                    </thead>
                    <tbody id="transactionsList" class="bg-white divide-y divide-gray-200">
                    {Lancamentos.length > 0 ? (
                        Lancamentos.map((lan) => (
                        <tr key={lan.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lan.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {typeof lan.categoria === 'string' ? lan.categoria : 'Categoria'}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(lan)}  
                                        className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3 py-1 rounded-md text-sm transition flex items-center">
                                        <i className="fas fa-edit mr-1"></i> Editar
                                    </button>
                                    <button 
                                        className="bg-[#262626] hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition border border-red-500 flex items-center"
                                        onClick={()=> handleDelete(lan.id)}>
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