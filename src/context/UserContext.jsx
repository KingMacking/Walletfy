import { useState, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
const UserContext = createContext({})
export const useUserContext = () => useContext(UserContext)

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const getUserData = async (uid) => {
        const docInfo = await getDoc(doc(db, 'users', uid))
        const userInfo = docInfo.data()
        return userInfo
    }

    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            if (!user) {
                    getUserData(firebaseUser.uid)
                    .then((data) => {
                        setUser(data)
                    })
                }
            
        } else {
            setUser(null)
        }
    })

    const updateCurrentUser = async () => {
        await getUserData(user?.uid)
        .then(data => setUser(data))
    }

    return (
        <UserContext.Provider value={{user, updateCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider