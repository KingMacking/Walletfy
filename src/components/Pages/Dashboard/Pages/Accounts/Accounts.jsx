import { useState } from "react";
import AccountsList from "../../AccountsList/AccountsList";
import NewAccountForm from "./NewAccountForm/NewAccountForm";




const Accounts = () => {
    const [transfering, setTransfering] = useState(false)
    return (
        <main className="flex justify-center bg-white dark:bg-blacker gap-4 min-h-screen h-auto px-4 ml-4 sm:ml-20 mr-4 lg:mr-80 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <NewAccountForm />
                <AccountsList canDelete={true} transfering={transfering} />
            </div>
        </main>
    )
}
export default Accounts