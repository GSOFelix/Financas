import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,} from 'firebase/firestore'
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

    return {buscarLancamentos}
}