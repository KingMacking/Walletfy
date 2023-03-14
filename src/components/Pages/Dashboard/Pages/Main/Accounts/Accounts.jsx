import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../../../../../../context/UserContext";
import AccountCard from "./AccountCard";

const Accounts = () => {
    const {user} = useUserContext()
    const [accounts, setAccounts] = useState()
    useEffect(()=> {
        setAccounts(user.accounts)
    }, [user])

    return (
        <section className="p-6">
            <h2 className="font-title text-4xl border-b-2 border-primary-interact mb-4 dark:text-white">Tus cuentas</h2>
            <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                {accounts?.length > 0 ? 
                    accounts.sort((a,b) => a.name.localeCompare(b.name)).map((account) => {
                        return (
                            <AccountCard key={account.name+account.currency} account={account} />
                        )
                    }) : (
                        <div>
                            <h2 className="font-title text-2xl mb-8 dark:text-white">No tienes ninguna cuenta registrada</h2>
                            <Link className="bg-primary hover:bg-primary-interact p-4 rounded-lg text-white text-xl" to="/dashboard/accounts">Agregar cuenta</Link>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
export default Accounts