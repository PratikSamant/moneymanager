import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async ( email, password, displayName ) => {
        setError(null)
        setIsPending(true)

        try {
            // signing up user
            const res = await createUserWithEmailAndPassword( auth, email, password)

            if(!res) {
                throw new Error('could not complete signup')
            }

            // adding displayName
            await updateProfile(auth.currentUser,{displayName})

            // dispatching login action
            dispatch({ type:'LOGIN', payload:res.user})

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }
    useEffect(()=> {
        return () => setIsCancelled(true)
    },[])


  return { error, isPending, signup}
}
