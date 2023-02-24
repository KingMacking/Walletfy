import { useState } from "react";
import AccountsList from "../../AccountsList/AccountsList";
import NewAccountForm from "./NewAccountForm/NewAccountForm";

//TODO Realizar en otro archivo una lista de las cuentas para poder eliminar las mismas (dropdown quizas e implementar edicion)



const Accounts = () => {
    const [transfering, setTransfering] = useState(false)
    return (
        <main className="flex bg-white gap-4 min-h-screen h-auto pl-4 sm:ml-[4.5rem] md:ml-24 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <NewAccountForm />
                <AccountsList canDelete={true} transfering={transfering} />
            </div>
        </main>
    )
}
export default Accounts