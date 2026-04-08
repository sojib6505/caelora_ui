import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import AuthContext from "./AuthContext"
import auth from "../../firebase/firebase.config"

export default function AuthProvider({children}) {
    const signUp = (email, password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
         return signInWithPopup(auth, provider)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const resetPassword = email => {
        return sendPasswordResetEmail(auth, email);
    }
    const authInfo = {
        signUp,
        signInWithGoogle,
        signIn,
        resetPassword,
    }
  return (
   <AuthContext  value={authInfo}>
      {children}
   </AuthContext>
  )
}
