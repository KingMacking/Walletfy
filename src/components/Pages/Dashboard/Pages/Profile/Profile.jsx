import { useState } from "react"
import ProfileCard from "./ProfileCard/ProfileCard"
import ProfileEditor from "./ProfileEditor/ProfileEditor"

const Profile = () => {
    const [isUpdating, setIsUpdating] = useState(false)

    return (
        <main className="flex bg-white dark:bg-blacker gap-4 justify-center min-h-screen h-auto px-4 ml-4 sm:ml-20 mr-4 lg:mr-80 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <ProfileCard isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
            </div>
        </main>
    )
}
export default Profile