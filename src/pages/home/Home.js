import styles from './Home.module.css'

import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// components
import TransactionForm from './TransactionForm'
import TranscationList from './TranscationList'


export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid ],
    ["createdAt", "desc"]
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
         {error && <p>{error}</p>}
         {documents && <TranscationList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>

    </div>
  )
}
