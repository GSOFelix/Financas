import { useState, useEffect } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";

export default function ModalAddTransacao({closeModal}) {
    const {user} = useAuth();
    const {buscarCategorias,addLancamento} = useFireBaseActions(user);
    const [categorias,setCategorias] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [DataLan, setData] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('C');
  
  useEffect(()=> {
    buscarCategorias((categorias)=>{
        setCategorias(categorias);
    })
},[]);

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

const handleSubmitLancamento = (e) => {
  e.preventDefault()
  if (!categoria || !descricao || !valor || !DataLan) {
      toastErro.fire({ text: 'Os campos são obrigatorios' });
    return;
  }
  if(valor <= 0){
      toastErro.fire({text: 'O valor deve ser maior que zero'})
      return;
  }

  const data = {
    categoria: categoria,        
    descricao: descricao,
    valor: parseFloat(valor),              
    DateTime: DataLan,                     
    tipo: tipo                    
  };

  addLancamento(data);
  limparCampos();
  toast.fire({ text: 'Registrado com sucesso.' });
  closeModal()
};

const limparCampos = () => {
  setCategoria('');
  setDescricao('');
  setValor(0);
  setData('');
  setTipo('C');
};

  

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="bg-[#171717] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h3 className="text-lg font-semibold">Adicionar Lançamento</h3>
          <button onClick={closeModal} className="text-white hover:text-gray-300">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmitLancamento} className="p-6">
          <div className="mb-4">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input type="text" id="descricao" value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]" />
          </div>

          <div className="mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select id="categoria" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
            value={categoria}
            
            onChange={(e) => setCategoria(e.target.value)}>
               <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
                <option key={cat.id} value={cat.descricao}>
                    {cat.descricao}
                </option>
            ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input type="datetime-local" id="data" value={DataLan}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]" />
          </div>

          <div className="mb-4">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input type="number" step="0.01" id="valor" value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e]" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="tipo" value="C" checked={tipo === 'C'}
                  onChange={() => setTipo('C')}
                  className="h-4 w-4 text-[#22c55e] focus:ring-[#22c55e] border-gray-300" />
                <span className="ml-2 text-gray-700">Receita</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="tipo" value="D" checked={tipo === 'D'}
                  onChange={() => setTipo('D')}
                  className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300" />
                <span className="ml-2 text-gray-700">Despesa</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22c55e]">
              Cancelar
            </button>
            <button type="submit"
              className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22c55e]">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
