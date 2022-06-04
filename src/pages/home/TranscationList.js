import React from 'react'
import styles from './Home.module.css'
import { db } from '../../firebase/config'

// firebase imports
import { doc, deleteDoc } from 'firebase/firestore'

export default function TranscationList({ transactions }) {

  const handleClick = async (id) => {

    const ref = doc(db, 'transactions', id)

    await deleteDoc(ref)
  }


  return (
    <ul className={styles.transaction}>
        {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p className={styles.name}>{transaction.name}</p>
              <p className={styles.amount}>{transaction.amount}</p>
              <button onClick={() => handleClick(transaction.id)} >X</button>
            </li>
        ))}

    </ul>
  )
}
