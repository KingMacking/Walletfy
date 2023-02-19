import Accounts from "./Accounts/Accounts"
import Greeting from "./Greeting"
import TotalBalance from "./TotalBalance"

//TODO: Hacer lista de actividades recientes (transferencias, nueva cuenta, agregado saldo, agregado pago, etc.)

const Main = () => {
    return (
        <main className="flex bg-white w-auto gap-4 min-h-screen h-auto pl-3 sm:ml-[4.5rem] md:ml-24">
            <div className="flex flex-col gap-8 w-auto">
                <Greeting />
                <TotalBalance />
                <Accounts />
            </div>
        </main>
    )
}
export default Main