import { useUserContext } from "../../../../../context/UserContext"

const currentHour = () => {
    const hour = new Date().getHours()
    if (hour > 5 && hour <= 12) {
        return "Buenos días"
    } else if (hour > 12 && hour <= 20) {
        return "Buenas tardes"
    } else {
        return "Buenas noches"
    }
}

const Greeting = () => {
    const {user} = useUserContext()
    return (
        <div className="flex w-full justify-start items-center gap-6 p-6 max-w-[300px] sm:max-w-full">
            <img className="rounded-full w-12 sm:w-16" src={user.thumbnail} referrerPolicy="no-referrer" />
            <h2 className="font-title font-bold text-2xl sm:text-3xl">{currentHour()}, {user.displayName.split(' ') ? user.displayName.split(' ')[0] : user.displayName}</h2>
        </div>
    )
}
export default Greeting