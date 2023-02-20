import { Icon } from "@iconify/react"
import { arrayRemove, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../../../../../config/firebase"
import { useUserContext } from "../../../../../../context/UserContext"

const accountCategoryIcon = (category) => {
    if (category === "bank") {
        return "fluent:building-bank-28-filled"
    } else if (category === "cash") {
        return "majesticons:money-line"
    } else if (category === "crypto") {
        return "majesticons:bitcoin-circle-line"
    } else if (category === "virtual-wallet") {
        return "mingcute:cellphone-vibration-line"
    }
}

//TODO Agregar alerta de cuenta eliminada

const AccountListItem = ({account, setAccounts}) => {
    const {user} = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)
    

    const deleteAccount= async (account) => {
        console.log(account);
        await updateDoc(queryUser, {
            accounts: arrayRemove(account)
        })
        setAccounts(user.accounts.filter((userAccount => userAccount !== account)))
    }

    return (
        <li className="flex items-center gap-4 border-b border-primary-interact last:border-b-0 py-2">
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{account.name}</div>
            <div className="w-[2.1rem] md:w-28 font-text text-sm md:text-lg flex justify-center items-center"><Icon icon={accountCategoryIcon(account.category)} inline={true} /></div>
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{account.currency} ${account.balance}</div>
            <button onClick={()=> deleteAccount(account)} className="w-[2.1rem] md:w-28 font-text text-2xl md:text-4xl flex items-center justify-end"><Icon className="text-[#ff0000] hover:cursor-pointer hover:bg-[#ff0000] hover:text-white p-1 rounded-lg" icon="material-symbols:delete-rounded" inline={true} /></button>
        </li>
    )
}
export default AccountListItem