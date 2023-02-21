import { useEffect, useState } from "react"
import { useUserContext } from "../../../../../../context/UserContext"
import AccountListItem from "./AccountsListItem"

//TODO Agregar alerta de cuenta eliminada

const AccountsList = () => {
    const {user} = useUserContext()
    const [accounts, setAccounts] = useState()

    useEffect(() => {
        setAccounts(user.accounts)
    }, [user])
    return (
        <div className="p-6 w-full">
            <ul className="p-4 sm:p-8 bg-[#ffffff] shadow-lg rounded-xl w-full">
                <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Tus cuentas</h2>
                <li className="flex items-center gap-12 border-b border-primary-interact last:border-b-0 py-2">
                    <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg font-bold">Nombre</div>
                    <div className="w-[2.1rem] md:w-28 font-text text-sm md:text-lg text-center font-bold">Tipo</div>
                    <div className="w-[4.9rem] md:w-40 font-text text-sm md:text-lg font-bold">Balance</div>
                </li>
                {accounts?.length > 0 ? 
                    accounts.map((account) => {
                        return (
                            <AccountListItem account={account} key={account.name+account.currency} setAccounts={setAccounts}/>
                        )
                    }) : (
                            <h3>No tienes ninguna cuenta registrada</h3>
                    )
                }
            </ul>
        </div>
    )
}
export default AccountsList