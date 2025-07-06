import { useEffect, useState } from "react"
import { useFireBaseActions } from "../hooks/useFirebaseActions";

export default function TransactionForm(){
    const{buscarCategorias} = useFireBaseActions();
    const [categorias,setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    useEffect(()=> {
        buscarCategorias((categorias)=>{
            setCategorias(categorias);
        })
    },[]);

    return(
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
            <div className="bg-[#171717] text-white px-4 py-3 flex justify-between items-center">
                <h3 className="font-medium">Adicionar Transação</h3>
                <button className="text-gray-300 hover:text-white">
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>
            <form id="transactionForm" className="p-4 border-b">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <input type="text" id="description" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                        <input type="number" step="0.01" id="amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Categoria
                        </label>
                        <select
                            id="category"
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm rounded-md"
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((cat,index) => (
                            <option key={cat.id} value={cat.index}>
                                {cat.descricao}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <input type="datetime-local" id="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]" />
                    </div>
                    
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    
                </div>
            </form>
        </div>
    )
}