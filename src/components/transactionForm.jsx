import { useEffect, useState } from "react"
import { useFireBaseActions } from "../hooks/useFirebaseActions";
import Swal from "sweetalert2";

export default function TransactionForm(){
    
    const{buscarCategorias,addLancamento} = useFireBaseActions();
    const [categorias,setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [descLancamento,setDescLancamento] = useState('');
    const [Amount,setAmout] = useState(0);
    const [DateTime,setDateTime] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('C');

    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#f0fdf4',
        color: '#14532d',
        iconColor: '#22c55e',
      });

      const toastErro = Swal.mixin({
        toast: true,
        position: 'top-end',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#red',
        color: '#14532d',
        iconColor: 'red',
      });

    const handleSubmitLancamento = () => {
        if (!categoriaSelecionada || !descLancamento || !Amount || !DateTime) {
            toastErro.fire({ text: 'Os campos são obrigatorios' });
          return;
        }
        if(Amount <= 0){
            toastErro.fire({text: 'O valor deve ser maior que zero'})
            return;
        }
      
        const data = {
          categoria: categoriaSelecionada,        
          descricao: descLancamento,
          valor: parseFloat(Amount),              
          DateTime: DateTime,                     
          tipo: tipoLancamento                    
        };
      
        addLancamento(data);
        limparCampos();
          
          toast.fire({ text: 'Registrado com sucesso.' });
      };

    const limparCampos = () => {
        setCategoriaSelecionada('');
        setDescLancamento('');
        setAmout(0);
        setDateTime('');
        setTipoLancamento('C');
    };

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
                        <input type="text" id="description" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                        value={descLancamento}
                        onChange={(e)=> setDescLancamento(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                        <input type="number" step="0.01" id="amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                        value={Amount}
                        onChange={(e)=> setAmout(e.target.value)} />
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
                            {categorias.map((cat) => (
                            <option key={cat.id} value={cat.descricao}>
                                {cat.descricao}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <input type="datetime-local" id="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                        value={DateTime}
                        onChange={(e)=> setDateTime(e.target.value)} />
                    </div>
                    
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center">
                        <input type="radio" id="income" className="h-4 w-4 text-[#16a34a] focus:ring-[#22c55e]" name="tipo"
                        value="C"
                        checked={tipoLancamento === 'C'}
                        onChange={(e) => setTipoLancamento(e.target.value)}/>
                        <label htmlFor="income" className="ml-2 block text-sm font-medium text-gray-700">Receita</label>
                    </div>

                    <div className="flex items-center">
                        <input type="radio" id="expense" className="h-4 w-4 text-[#16a34a] focus:ring-[#22c55e]"
                        name="tipo"
                        value="D"
                        checked={tipoLancamento === 'D'}
                        onChange={(e) => setTipoLancamento(e.target.value)}/>
                        <label htmlFor="expense" className="ml-2 block text-sm font-medium text-gray-700">Despesa</label>
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                    <button type="button" className=" px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                    onClick={limparCampos}>Cancelar</button>
                    <button type="button" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22c55e]"
                    onClick={handleSubmitLancamento}>Adicionar Transação</button>
                </div>
            </form>
        </div>
    )
}