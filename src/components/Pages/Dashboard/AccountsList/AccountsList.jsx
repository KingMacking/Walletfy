import { Waveform } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useUserContext } from "../../../../context/UserContext"
import AccountsListItem from "./AccountsListItem"

const AccountsList = ({canDelete, transfering}) => {
    const {user} = useUserContext()
    const [accounts, setAccounts] = useState()

    useEffect(()=> {
        setAccounts(user.accounts)
    }, [user])

    return (
        <div className="p-6 w-full">
            {
                transfering ? 
                    <div className="p-4 sm:p-8 gap-4 w-full md:w-[530px] flex justify-center items-center">
                        <Waveform className="w-full" size={80} lineWeight={5.5} speed={1} color="#372274" />
                    </div>
                :
                <ul className="p-4 sm:p-8 gap-4 bg-[#ffffff] shadow-lg rounded-xl w-full">
                    <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Tus cuentas</h2>
                    <li className="flex items-center gap-4 justify-between border-b border-primary-interact last:border-b-0 py-2">
                        <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg font-bold">Nombre</div>
                        <div className="w-[5.1rem] md:w-40 font-text text-sm md:text-lg font-bold">Balance</div>
                        <div className={`w-[2.1rem] md:w-28 font-text text-sm md:text-lg ${canDelete ? "text-center" : "text-end"} font-bold`}>Tipo</div>
                        {canDelete && <div className="w-[3.1rem] md:w-28 font-text text-sm md:text-lg text-end font-bold">Eliminar</div>}
                    </li>
                    {accounts?.length > 0 ? 
                        accounts.map((account) => {
                            return (
                                <AccountsListItem account={account} key={account.name+account.currency} setAccounts={setAccounts} canDelete={canDelete}/>
                            )
                        }) : (
                                <h2>No tienes ninguna cuenta registrada</h2>
                        )
                    }
                </ul>
            }
            
        </div>
    )
}
export default AccountsList