import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import AuthContext from "./AuthContext"
import auth from "../../firebase/firebase.config"
import { useEffect, useState } from "react"

export default function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const signUp = (email, password)=>{
         setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
         setLoading(true);
        const provider = new GoogleAuthProvider()
         return signInWithPopup(auth, provider)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const resetPassword = email => {
        return sendPasswordResetEmail(auth, email);
    }
    useEffect(()=>{
        const unsbscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsbscribe();
        }
    }, [])
    
    const logOut = () => {
        signOut(auth)
    }
    const authInfo = {
        signUp,
        signInWithGoogle,
        signIn,
        resetPassword,
        user,
        loading,
        logOut
    }
  return (
   <AuthContext  value={authInfo}>
      {children}
   </AuthContext>
  )
}
