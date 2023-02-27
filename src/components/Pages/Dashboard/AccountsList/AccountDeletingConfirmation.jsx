import { arrayRemove, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../../../config/firebase"
import { useUserContext } from "../../../../context/UserContext"
import Modal from "../../../Modal/Modal"


const AccountDeletingConfirmation = ({account, isConfirming, setIsConfirming}) => {
    const {user, updateCurrentUser} = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)
    const confirmDeleteButton = <button className="bg-primary text-white text-xl font-text px-4 py-2 border border-primary rounded-xl hover:bg-primary-interact transition-all ease-in-out" onClick={() => confirmDelete(account)}>Eliminar</button>
    
    const confirmDelete= async (account) => {
        const deleteAccountToast = toast.loading("Eliminando cuenta", {position: "bottom-center"})
        await updateDoc(queryUser, {
            accounts: arrayRemove(account)
        })
        .then(() => {
            updateCurrentUser()
            setIsConfirming(false)
            toast.update(deleteAccountToast, {
                render:"Cuenta eliminada", 
                type: "success", 
                isLoading: false, 
                autoClose:3000, 
                position: "bottom-center", 
                hideProgressBar: false
            })
        })
    }
    
    return (
        <Modal title="Confirmar eliminar cuenta" show={isConfirming} onClose={() => setIsConfirming(false)} confirmButton={confirmDeleteButton}>
            <p className="font-text text-xl mb-2">Estas a punto de eliminar la cuenta:</p>
            <p className="font-text text-2xl font-bold">{account?.name}</p>
        </Modal>
    )
}
export default AccountDeletingConfirmation