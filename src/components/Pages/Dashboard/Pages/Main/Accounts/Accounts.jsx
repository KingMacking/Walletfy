import { Link } from "react-router-dom"
import { useUserContext } from "../../../../../../context/UserContext";
import AccountCard from "./AccountCard";



//TODO Buscar como realizar carrusel para las cuentas


const Accounts = () => {
    const {user} = useUserContext()
    return (
        <div className="p-6">
            <h2 className="font-title text-4xl border-b-2 border-primary-interact mb-4">Tus cuentas</h2>
            <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                {user.accounts.length > 0 ? 
                    user.accounts.map((account) => {
                        return (
                            <AccountCard key={account.name+account.currency} account={account} />
                        )
                    }) : (
                        <div>
                            <h2>No tienes ninguna cuenta registrada</h2>
                            <Link to="/dashboard/accounts">Agregar cuenta</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Accounts