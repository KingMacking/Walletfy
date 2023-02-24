import { useState } from "react"
import ProfileCard from "./ProfileCard/ProfileCard"
import ProfileEditor from "./ProfileEditor/ProfileEditor"

const Profile = () => {
    const [isUpdating, setIsUpdating] = useState(false)

    return (
        <main className="flex bg-white gap-4 min-h-screen h-auto pl-3 sm:ml-[4.5rem] md:ml-24 w-full">
            <div className="flex flex-col gap-8 w-full md:w-auto items-center">
                <ProfileCard isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
            </div>
        </main>
    )
}
export default Profile