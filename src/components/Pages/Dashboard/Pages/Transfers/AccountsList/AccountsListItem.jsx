import { Icon } from "@iconify/react"
import { useUserContext } from "../../../../../../context/UserContext"

const accountCategoryIcon = (category) => {
    if (category === "bank") {
        return "fluent:building-bank-28-filled"
    } else if (category === "cash") {
        return "majesticons:money-line"
    } else if (category === "crypto") {
        return "majesticons:bitcoin-circle-line"
    } else if (category === "virtual-wallet") {
        return "mingcute:cellphone-vibration-line"
    }
}

//TODO Agregar alerta de cuenta eliminada

const AccountListItem = ({account, setAccounts}) => {
    const {user} = useUserContext()


    return (
        <li className="flex items-center gap-4 border-b border-primary-interact last:border-b-0 py-2">
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{account.name}</div>
            <div className="w-[2.1rem] md:w-28 font-text text-sm md:text-lg flex justify-center items-center"><Icon icon={accountCategoryIcon(account.category)} inline={true} /></div>
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{account.currency} ${account.balance}</div>
        </li>
    )
}
export default AccountListItem