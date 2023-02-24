import { Waveform } from "@uiball/loaders"
import { useState } from "react"
import AccountsList from "../../AccountsList/AccountsList"
import IncomesForm from "./IncomesForm/IncomesForm"

const Incomes = () => {
    const [transfering, setTransfering] = useState(false)
    return (
        <main className="flex bg-white gap-4 min-h-screen h-auto pl-3 sm:ml-[4.5rem] md:ml-24 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <IncomesForm transfering={transfering} setTransfering={setTransfering} />
                <AccountsList canDelete={false} transfering={transfering} />
            </div>
        </main>
    )
}
export default Incomes