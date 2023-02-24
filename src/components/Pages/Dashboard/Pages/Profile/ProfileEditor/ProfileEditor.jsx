import { useState } from "react"
import Modal from "../../../../../Modal/Modal"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useUserContext } from "../../../../../../context/UserContext";

const generateUpdateUserSchema = yup.object({
    thumbnail: yup.string().url("Ingresa un link valido"),
    displayName: yup.string()
})

const ProfileEditor = ({setIsUpdating, isEditing, setIsEditing}) => {
    const {user, updateCurrentUser } = useUserContext()
    const sendButton = <button className="bg-primary text-white text-xl font-text px-4 py-2 border border-primary rounded-xl hover:bg-primary-interact transition-all ease-in-out" type="submit" form="change-profile">Confirmar</button>
    const queryUser =  doc(db, 'users', user.uid)
    const [isEmpty, setIsEmpty] = useState(false)

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: yupResolver(generateUpdateUserSchema)})

    const onSubmit = async (data) => {
        const thumbnail = data.thumbnail
        const displayName = data.displayName

        if((thumbnail !== '' && thumbnail !== user.thumbnail) && (displayName !== '' && displayName !== user.displayName)){
            setIsUpdating(true)
            setIsEditing(false)
            setIsEmpty(false)
            reset()
            await updateDoc(queryUser, {
                thumbnail: thumbnail,
                displayName: displayName
            })
            .then(() => {
                updateCurrentUser()
            })
            .finally(()=> {
                setIsUpdating(false)
            })
        } else if (displayName !== '' && displayName !== user.displayName){
            setIsUpdating(true)
            setIsEditing(false)
            setIsEmpty(false)
            reset()
            await updateDoc(queryUser, {
                displayName: displayName
            })
            .then(() => {
                updateCurrentUser()
            })
            .finally(()=> {
                setIsUpdating(false)
            })
        } else if (thumbnail !== '' && thumbnail !== user.thumbnail){
            setIsUpdating(true)
            setIsEditing(false)
            setIsEmpty(false)
            reset()
            await updateDoc(queryUser, {
                thumbnail: thumbnail
            })
            .then(() => {
                updateCurrentUser()
            })
            .finally(()=> {
                setIsUpdating(false)
            })
        } else {
            setIsEmpty(true)
            reset()
        }
    }

    return (
        <Modal title="Actualizar usuario" id="change-profile" show={isEditing} onClose={() => setIsEditing(false)} confirmButton={sendButton}>
            <>
                <form id="change-profile" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                    <div>
                        <h3 className="font-text text-md md:text-xl mt-3 ml-1 mb-1">URL de la imagen</h3>
                        <input className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" type="url" {...register("thumbnail")} placeholder="www.photourl.com"/>
                        <p>{errors.thumbnail?.message}</p>
                    </div>
                    <div className={`${isEmpty ? "mb-0" : "mb-6"}`}>
                        <h3 className="font-text text-md md:text-xl mt-3 ml-1 mb-1">Nombre visible</h3>
                        <input className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" type="text" {...register("displayName")} placeholder="Pedro Sanchez"/>
                        <p>{errors.displayName?.message}</p>
                    </div>
                </form>
                {isEmpty && <p className="font-text text-2xl w-full text-center mb-4 mt-2">Debes ingresar por lo menos un cambio</p>}
            </>
        </Modal>
    )
}
export default ProfileEditor