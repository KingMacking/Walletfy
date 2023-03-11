import { Icon } from "@iconify/react"

const accountTypeName = (category) => {
    if (category === "income") {
        return "Ingreso"
    } else if (category === "transfer") {
        return "Transferencia"
    } else if (category === "payment") {
        return "Pago"
    }
}

const Activity = ({activity}) => {
    return (
        <div className="flex flex-col gap-1 border-b border-primary-interact py-4 last:border-b-0 px-2">
            <h4 className="font-title text-xl flex gap-2 items-center font-bold"><Icon className="rounded-full bg-primary text-white dark:bg-white dark:text-primary p-1 text-4xl" icon={activity.typeIcon} inline={true} />{accountTypeName(activity.typeName)}</h4>
            <p className="text-lg">${activity.amount}<span className="text-xs ml-1">{activity.currency}</span></p>
            <div className="flex items-center gap-3">
                <p className="font-text text-sm">{activity.baseAccount}</p>
                {activity.targetAccount && (
                    <>
                        <span className="text-sm">→</span>
                        <p className="font-text text-sm">{activity.targetAccount}</p>
                    </>
                )}
            </div>
            {
                activity.reference && <p className="font-text text-sm">Motivo: {activity.reference}</p>
            }
        </div>
    )
}
export default Activity