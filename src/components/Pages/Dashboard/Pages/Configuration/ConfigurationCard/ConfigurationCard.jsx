import { Icon } from "@iconify/react"
import { Waveform } from "@uiball/loaders"
import { useState } from "react"
import { useUserContext } from "../../../../../../context/UserContext"
import ConfigurationEditor from "../ConfigurationEditor/ConfigurationEditor"

const ConfigurationCard = ({isUpdating, setIsUpdating}) => {
    const {user} = useUserContext()
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div className="p-6 w-full">
            <div className="flex  flex-col p-4 sm:p-8 gap-4 bg-real-white dark:bg-black dark:text-white shadow-lg rounded-xl justify-center items-center w-full md:w-[530px]">
            {
                isUpdating ? <Waveform className="w-full" size={80} lineWeight={5.5} speed={1} color="#372274" />
                :
                    <>
                        <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Configuraciones</h2>
                        <div className="w-full ml-6 flex flex-col gap-4 my-4">
                            <p className="font-text text-xl w-full flex items-center gap-2"><Icon className="text-white rounded-full bg-primary p-2 text-4xl" icon="ic:round-language" inline={true} />Idioma: Español <Icon icon="emojione-v1:flag-for-spain" /></p>
                            <p className="font-text text-xl w-full flex items-center gap-2"><Icon className="text-white rounded-full bg-primary p-2 text-4xl" icon="majesticons:money-line" inline={true} />Moneda base: {user.currency}</p>
                        </div>
                        <button className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8 px-4" onClick={ () => setIsEditing(true)}>Editar configuraciones</button>
                    </>
            }
            </div>
            <ConfigurationEditor setIsUpdating={setIsUpdating} isEditing={isEditing} setIsEditing={setIsEditing}/>
        </div>
    )
}
export default ConfigurationCard