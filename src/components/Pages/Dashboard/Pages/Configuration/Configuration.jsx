import { useState } from "react"
import ConfigurationCard from "./ConfigurationCard/ConfigurationCard"

const Configuration = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    return (
        <main className="flex bg-white gap-4 min-h-screen h-auto pl-3 sm:ml-[4.5rem] md:ml-24 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <ConfigurationCard isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
            </div>
        </main>
    )
}
export default Configuration