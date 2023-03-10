import { Icon } from "@iconify/react"
import { useState } from "react"

const DarkmodeSwitch = () => {
    const [darkMode, setDarkMode] = useState(false)
    const moonIcon = "ph:moon-fill"
    const sunIcon = "ph:sun-fill"

    const toggleDarkmode = () => {
        setDarkMode(!darkMode)
    }


    return (
        <div>

        </div>
    )
}
export default DarkmodeSwitch