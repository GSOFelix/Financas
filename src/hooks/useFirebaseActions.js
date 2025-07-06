import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp
} from 'firebase/firestore'
    import {db} from '../firebase/config'

export function useFireBaseActions(){

    const buscarLancamentos = (callback) => {
        onSnapshot(collection(db,'lancamentos'), (snapshot) => {
            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
            console.log(result);
            callback(result);
        })
    }

    const buscarCategorias = (callback) => {
        onSnapshot(collection(db,'categoria'), (snapshot) => {
            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
            console.log(result);
            callback(result);
        })
    }

    const addLancamento = async (data) =>{
        if(data === null) return;

        try{
            
            await addDoc(collection(db,'lancamentos'),{
                descricao: data.descricao,
                categoria: data.categoria,
                tipo: data.tipo,
                valor: data.valor,
                data: Timestamp.fromDate(new Date(data.DateTime))
            })
        }catch(e){
            console.error('Error adding lancamento: ', e);
            
        }
    }

    const editarLancamento = async (atualizacao) =>{
        const { id, ...dadosParaAtualizar } = atualizacao; 
        const documentoRef = doc(db, 'lancamentos', id);
        await updateDoc(documentoRef, dadosParaAtualizar);
    }

   const apagarLancamento = async (lancamentoId) => {
        const documento = doc(db, 'lancamentos', lancamentoId);
        await deleteDoc(documento);
      }

    return {buscarLancamentos,buscarCategorias,addLancamento,editarLancamento,apagarLancamento}
}