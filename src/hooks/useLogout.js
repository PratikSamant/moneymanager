import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { signOut } from 'firebase/auth'

export const useLogout = () => {
    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () =>{
        setError(null)
        setIsPending(true)

        // signing user out
        try {
            await signOut(auth)

            // dispatch logout
            dispatch({ type: 'LOGOUT'})

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    } 

    useEffect (() => {
        return () => setIsCancelled(true)
    },[])

    // adding clear up functions ()

  return { logout, error, isPending }
}
