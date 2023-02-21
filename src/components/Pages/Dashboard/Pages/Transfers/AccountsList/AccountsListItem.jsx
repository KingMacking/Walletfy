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

const AccountListItem = ({account}) => {
    const userAccount = account

    return (
        <li className="flex items-center justify-between gap-12 border-b border-primary-interact last:border-b-0 py-2">
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{userAccount.name}</div>
            <div className="w-[4.9rem] md:w-40 font-text text-sm md:text-lg">{userAccount.currency} ${(Math.round(userAccount.balance *100) / 100).toFixed(2)}</div>
            <div className="w-[2.1rem] md:w-28 font-text text-lg md:text-2xl flex justify-end items-center"><Icon icon={accountCategoryIcon(userAccount.category)} inline={true} /></div>
        </li>
    )
}
export default AccountListItem