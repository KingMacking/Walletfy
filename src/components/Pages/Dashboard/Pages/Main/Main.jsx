import Accounts from "./Accounts/Accounts"
import Greeting from "./Greeting"
import TotalBalance from "./TotalBalance"

const Main = () => {
    return (
        <main className="flex bg-white dark:bg-blacker w-full gap-4 min-h-screen h-auto px-4 sm:ml-20 lg:mr-80">
            <div className="flex flex-col gap-8 w-auto">
                <Greeting />
                <TotalBalance />
                <Accounts />
            </div>
        </main>
    )
}
export default Main