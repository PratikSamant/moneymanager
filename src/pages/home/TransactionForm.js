import React, { useState } from 'react'
import { db, timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'

// firebase imports
import { addDoc, collection } from 'firebase/firestore'

export default function TransactionForm() {
    const [ name, setName ] = useState('')
    const [ amount, setAmount ] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const ref=collection(db, 'transactions')


        await addDoc(ref, {
            name,
            amount,
            uid: user.uid,
            createdAt: timestamp
        })

        setName('')
        setAmount('')
    }
    

  return (
    <>
        <h3>Add a Transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Transaction name: </span>
                <input 
                    type='text'
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                <span>Amount:</span>
                <input 
                    type='number'
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </label>
            <button>Add Transaction</button>
        </form>
    </>
  )
}
