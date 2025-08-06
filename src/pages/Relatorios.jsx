import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions";
import { Meses, Tipos, anos } from "../constants/filtros";
import RelacaoTransacao from "../components/RelacaoTransacao";
import ModalEditar from "../components/ModalEditar";
import { useAuth } from "../context/authContext";

export default function Relatorios(){
    const {user} = useAuth();
    const{buscarCategorias,editarLancamento,apagarLancamento} = useFireBaseActions(user);
    const [categorias,setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [mesSelecionado,setMesSelecionado] = useState('');
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear().toString());
    const [tipoSelecionado,setTipoSelecionado] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [editeItem,setEditItem] = useState(null);
    const [input,setInput] = useState('');
    const handleModal = () =>{
        setShowModal(!showModal);
    }

    const handleEditeItem = (item) =>{
        setEditItem(item)
        setShowModal(true);
    }

    useEffect(()=> {
        buscarCategorias((categorias)=>{
            setCategorias(categorias);
        })
    },[]);
    return(
        <>
     <div className="max-w-7xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Relatórios Financeiros
  </h2>

  <div className="bg-white rounded-lg shadow mb-6 p-4">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Campo de busca */}
      <div className="w-full md:flex-1">
        <label htmlFor="search" className="sr-only">Pesquisar</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm"
            placeholder="Pesquisar transações..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros */}
<div className="space-y-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
    <select
      id="filtroMes"
      value={mesSelecionado}
      onChange={(e) => setMesSelecionado(e.target.value)}
      className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
    >
      <option value="">Todos os meses</option>
      {Meses.map((mes, index) => (
        <option key={index} value={index + 1}>{mes}</option> // O value agora é o número do mês (1-12)
      ))}
    </select>
    <select
    id="filtroAno"
    value={anoSelecionado}
    onChange={(e) => setAnoSelecionado(e.target.value)}
    className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
  >
    {anos.map((ano) => (
      <option key={ano} value={ano}>{ano}</option>
    ))}
  </select>
    <select
      id="filtroCategoria"
      value={categoriaSelecionada}
      onChange={(e) => setCategoriaSelecionada(e.target.value)}
      className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
    >
      <option value="">Todas as categorias</option>
      {categorias.map((cat) => (
        <option key={cat.id} value={cat.descricao}>{cat.descricao}</option>
      ))}
    </select>
    <select
      id="filtroTipo"
      value={tipoSelecionado}
      onChange={(e) => setTipoSelecionado(e.target.value)}
      className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
    >
      <option value="">Todos os tipos</option>
      <option value="C">Receita</option>
      <option value="D">Despesa</option>
    </select>
  </div>
  
  {/* Botão Limpar Filtros */}
  {(mesSelecionado || categoriaSelecionada || tipoSelecionado) && (
    <button
      onClick={() => {
        setMesSelecionado('');
        setAnoSelecionado('')
        setCategoriaSelecionada('');
        setTipoSelecionado('');
      }}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#22c55e] transition-colors duration-200"
    >
      <i className="fas fa-times-circle"></i>
      Limpar filtros
    </button>
  )}
</div>
    </div>
  </div>


          <RelacaoTransacao
            input={input}
            mes={mesSelecionado}
            ano={anoSelecionado}
            categoria={categoriaSelecionada}
            tipo={tipoSelecionado}
            onEdit={handleEditeItem}
            DeletarLancamento={apagarLancamento}
            />

          {showModal && 
          <ModalEditar 
          dados={editeItem} 
          closeModal={handleModal} 
          salvarEdicao={editarLancamento}
          />
          }
        </div>
      </>
    )
}