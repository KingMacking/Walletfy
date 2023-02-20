import AccountsList from "./AccountsList/AccountsList"
import TransferForm from "./TransferFrom/TransferForm"

const Transfers = () => {
    return (
        <main className="flex bg-white w-auto gap-4 min-h-screen h-auto pl-3 sm:ml-[4.5rem] md:ml-24">
            <div className="flex flex-col gap-8 w-auto">
                <TransferForm />
                <AccountsList />
            </div>
        </main>
    )
}
export default Transfers