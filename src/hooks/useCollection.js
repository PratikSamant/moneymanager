import { useEffect, useRef, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection,onSnapshot, where, query, orderBy } from 'firebase/firestore'


export const useCollection = (c, _q, _orderBy) => {
    const [ documents, setDocuments ] = useState(null)
    const [ error, setError ] = useState(null)

    // setting up query (using useRef to avoid infinite loop)
    // _q is an array and is different on every function call
    const q = useRef(_q).current
    const o = useRef(_orderBy).current

    useEffect(() => {
        let ref = collection(db, c)

        if (q) {
            ref= query(ref, where(...q))
        }
        if (o) {
            ref = query(ref, orderBy(...o))
        }

        const unsub = onSnapshot(ref,(snapshot) => {
            let results =[]
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            // update state
            setDocuments(results)
            setError(null)
        })

        // unsubscribe or unmount
        return() => unsub()

    },[c, q, o])

  return { documents, error}
}
