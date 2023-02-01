import { useState, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
const UserContext = createContext({})
export const useUserContext = () => useContext(UserContext)

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    // const getUserInfo = async (uid) => {
    //     const docInfo = await getDoc(doc(db, 'users', uid))
    //     const userInfo = docInfo.data()
    //     return userInfo
    // }

    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            if (!user) {
                    const userData = firebaseUser
                    setUser(userData)
                }
            
        } else {
            setUser(null)
        }
    })

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider