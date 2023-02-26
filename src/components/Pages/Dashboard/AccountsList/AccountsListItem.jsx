import { Icon } from "@iconify/react"

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

const AccountsListItem = ({account, canDelete, confirmDelete}) => {
    const userAccount = account
    
    return (
        <li className="flex items-center gap-2 justify-between border-b border-primary-interact last:border-b-0 py-2">
            <div className="w-[5.65rem] md:w-40 font-text text-sm md:text-lg">{account.name}</div>
            <div className="w-[5.1rem] md:w-40 font-text text-sm md:text-lg">{account.currency} ${(Math.round(userAccount.balance *100) / 100).toFixed(2)}</div>
            <div className={`w-[2.1rem] md:w-28 font-text text-sm md:text-2xl flex ${canDelete ? "justify-center" : "justify-end"} items-center`}><Icon icon={accountCategoryIcon(account.category)} inline={true} /></div>
            {
                canDelete &&    <div className="w-[3.1rem] md:w-28 font-text text-2xl md:text-4xl flex items-center justify-end">
                                    <button onClick={()=> confirmDelete(account)}><Icon className="text-[#ff0000] hover:cursor-pointer hover:bg-[#ff0000] hover:text-white p-1 rounded-lg" icon="material-symbols:delete-rounded" inline={true} /></button>
                                </div>
            }
        </li>
    )
}
export default AccountsListItem