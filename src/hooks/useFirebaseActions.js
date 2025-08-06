import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp,
    query,
    where,
    getDoc
} from 'firebase/firestore'
    import {db} from '../firebase/config'

export function useFireBaseActions(user){
    const buscarLancamentos = (callback) => {
        try {
            const q = query(
                collection(db, 'lancamentos'), 
                where("uid", "==", user.uid)
            );
            
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const result = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                callback(result);
            }, (error) => {
                console.error("Erro ao buscar lançamentos:", error);
                callback([]); // Retorna array vazio em caso de erro
            });
    
            // Retorna função de cleanup
            return unsubscribe;
        } catch(error) {
            console.error("Erro ao configurar listener:", error);
            callback([]); // Retorna array vazio em caso de erro
        }
    }

    const buscarCategorias = (callback) => {
        onSnapshot(collection(db,'categoria'), (snapshot) => {
            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
            callback(result);
        })
    }

    const addLancamento = async (data) =>{
        if(data === null) return;

        try{
            
            await addDoc(collection(db,'lancamentos'),{
                uid: user.uid,
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

    const editarLancamento = async (atualizacao) => {
        if (!user) return;

        const { id, ...dadosParaAtualizar } = atualizacao;
        try {
            const docRef = doc(db, 'lancamentos', id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists() && docSnap.data().uid === user.uid) {
                await updateDoc(docRef, dadosParaAtualizar);
            }
        } catch(e) {
            console.error('Erro ao editar lançamento:', e);
        }
    }

    const apagarLancamento = async (lancamentoId) => {
        if (!user) return;

        try {
            const docRef = doc(db, 'lancamentos', lancamentoId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists() && docSnap.data().uid === user.uid) {
                await deleteDoc(docRef);
            }
        } catch(e) {
            console.error('Erro ao apagar lançamento:', e);
        }
    }

    return {buscarLancamentos,buscarCategorias,addLancamento,editarLancamento,apagarLancamento}
}