import { Icon } from "@iconify/react";


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

const AccountCard = ({account}) => {
    return (
        <div className="flex flex-col shadow-lg rounded-xl bg-[#ffffff] p-4 w-fit min-w-[300px]">
            <h2 className="flex gap-4 justify-start items-center font-title text-2xl border-b border-primary-interact py-2">
                {<Icon className="text-white rounded-full bg-primary p-2 text-5xl" icon={accountCategoryIcon(account.category)} inline={true} />}
                {account.name}
            </h2>
            <p className="font-text text-4xl mt-6">${account.balance} <span className="text-lg">{account.currency}</span></p>
        </div>
    )
}
export default AccountCard