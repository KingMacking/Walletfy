import { useState } from "react"
import ConfigurationCard from "./ConfigurationCard/ConfigurationCard"

const Configuration = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    return (
        <main className="flex justify-center bg-white gap-4 min-h-screen h-auto px-4 ml-4 sm:ml-20 mr-4 lg:mr-80 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <ConfigurationCard isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
            </div>
        </main>
    )
}
export default Configuration