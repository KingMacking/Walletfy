import { Icon } from "@iconify/react"
import { useState } from "react"
import Activity from "./Activity/Activity"
import { useUserContext } from "../../../../context/UserContext"

const ActivitiesBar = () => {
    const [open, setOpen] = useState(false)
    const {user} = useUserContext()
    const reversedActivities = user.lastActivities ? [...user.lastActivities].reverse() : []

    return (
        <>
            <div className="hidden lg:flex lg:flex-col bg-real-white dark:bg-black dark:text-white min-w-[20rem] px-4 shadow-[-15px_0_10px_-6px_rgba(0,0,0,0.1)] h-full fixed right-0">
                <h3 className="font-title text-3xl py-2 border-b border-b-primary w-fit mx-auto mt-4">Ultimos movimientos</h3>
                <div className="flex flex-col overflow-y-auto scrollbar-thumb-primary scrollbar-thin">
                    {reversedActivities.length > 0 ? reversedActivities.map((activity, index) => {
                        return <Activity activity={activity} key={index}/>
                    }) : (
                        <p className="w-full mt-4 text-xl font-text">No tienes actividades recientes</p>
                    )}
                </div>
            </div>

            {/* Mobile activities */}
            <div className={`lg:hidden flex flex-col fixed h-full bg-real-white dark:bg-black dark:text-white shadow-[-15px_0_10px_-6px_rgba(0,0,0,0.1)] w-80 px-4 duration-500  ${open ? "-right-0" : "-right-[19rem]"}`}>
                <Icon className={`text-3xl cursor-pointer bg-primary text-white rounded-full absolute -left-3 p-1 top-[26px] border-2 border-white duration-500 ${open && "rotate-180"}`} onClick={()=> setOpen(!open)} icon="material-symbols:play-arrow-rounded" rotate={2} inline={true} />
                <h3 className="font-title text-3xl py-2 border-b border-b-primary w-fit mx-auto mb-2 mt-4">Ultimos movimientos</h3>
                <div className="flex flex-col overflow-y-auto scrollbar-thumb-primary scrollbar-thin">
                    {reversedActivities.length > 0 ? reversedActivities.map((activity, index) => {
                        return <Activity activity={activity} key={index}/>
                    }) : (
                        <p className="w-full mt-4 text-xl font-text">No tienes actividades recientes</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default ActivitiesBar