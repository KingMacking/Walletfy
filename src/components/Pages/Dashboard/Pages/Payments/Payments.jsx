import { Waveform } from "@uiball/loaders"
import { useState } from "react"
import AccountsList from "../../AccountsList/AccountsList"
import PaymentsForm from "./PaymentsForm/PaymentsForm"

const Payments = () => {
    const [transfering, setTransfering] = useState(false)
    return (
        <main className="flex justify-center bg-white dark:bg-blacker gap-4 min-h-screen h-auto px-4 ml-4 sm:ml-20 mr-4 lg:mr-80 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <PaymentsForm transfering={transfering} setTransfering={setTransfering} />
                <AccountsList canDelete={false} transfering={transfering} />
            </div>
        </main>
    )
}
export default Payments