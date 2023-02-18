import { useUserContext } from "../../../../../context/UserContext"
import Accounts from "./Accounts/Accounts"
import Greeting from "./Greeting"
import TotalBalance from "./TotalBalance"



//TODO Obtener balances de las cuentas (pasar user a total balance)

const Main = () => {
    const {user} = useUserContext()
    return (
        <main className="py-6 px-8 sm:px-12 flex bg-white w-full gap-4 min-h-screen h-auto ">
            <div className="flex flex-col gap-8">
                <Greeting user={user} />
                <TotalBalance user={user} />
                <Accounts user={user} />
            </div>
        </main>
    )
}
export default Main