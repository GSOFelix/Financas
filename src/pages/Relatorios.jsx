import { useEffect, useState } from "react";
import { useFireBaseActions } from "../hooks/useFirebaseActions";
import { Meses, Tipos } from "../constants/filtros";
import RelacaoTransacao from "../components/RelacaoTransacao";
import ModalEditar from "../components/ModalEditar";

export default function Relatorios(){
    const{buscarCategorias,editarLancamento,apagarLancamento} = useFireBaseActions();
    const [categorias,setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [mesSelecionado,setMesSelecionado] = useState('');
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                    <label htmlFor="search" className="sr-only">Pesquisar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"> 
                            </i>
                        </div>
                        <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm" 
                        placeholder="Pesquisar transações..."
                        value={input}
                        onChange={(e)=> setInput(e.target.value)}/>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                        <div>
                            <select id="filtroMes" 
                            value={mesSelecionado}
                            onChange={(e)=> setMesSelecionado(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm rounded-md">
                                <option value="">Todos os meses</option>
                                {Meses.map((mes,index) => (
                                    <option key={index} value={mes}>
                                        {mes}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select id="filtroCategoria" 
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm rounded-md">
                            <option value="">Todas as categorias</option>
                            {categorias.map((cat) => (
                            <option key={cat.id} value={cat.descricao}>
                                {cat.descricao}
                            </option>
                            ))}
                            </select>
                        </div>

                        <div>
                            <select id="filtroTipo" 
                            value={tipoSelecionado}
                            onChange={(e) => setTipoSelecionado(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] sm:text-sm rounded-md">
                                <option value="">Todos os tipos</option>
                                <option value="C">Receita</option>
                                <option value="D">Despesa</option>
                            </select>
                        </div>
                        
                    </div>
                
            </div>
          </div>

          <RelacaoTransacao
            input={input}
            mes={mesSelecionado}
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