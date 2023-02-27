import { doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { db } from "../../../../../../config/firebase"
import { useUserContext } from "../../../../../../context/UserContext"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Modal from "../../../../../Modal/Modal"
import { toast } from "react-toastify"

const generateUpdateConfigsSchema = yup.object({
    currency: yup.string().oneOf(["EUR", "USD", "ARS"], "Debes seleccionar una moneda").required("Debes elegir una moneda")
})

const ConfigurationEditor = ({setIsUpdating, isEditing, setIsEditing}) => {
    const {user, updateCurrentUser } = useUserContext()
    const sendButton = <button className="bg-primary text-white text-xl font-text px-4 py-2 border border-primary rounded-xl hover:bg-primary-interact transition-all ease-in-out" type="submit" form="change-config">Confirmar</button>
    const queryUser =  doc(db, 'users', user.uid)
    const [isEmpty, setIsEmpty] = useState(false)
    const [currency, setCurrency] = useState()

    useEffect(()=> {
        console.log(currency);
    },[currency])


    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm({resolver: yupResolver(generateUpdateConfigsSchema)})

    const onSubmit = async (data) => {
        const currency = data.currency
        const configToast = toast.loading("Aplicando cambios", {position: "bottom-center"})
        if(currency !== '' && currency !== user.currency){
            reset()
            setIsUpdating(true)
            setIsEditing(false)
            setIsEmpty(false)
            await updateDoc(queryUser, {
                currency: currency
            })
            .then(() => {
                updateCurrentUser()
            })
            .finally(()=> {
                setIsUpdating(false)
                toast.update(configToast, {
                    render:"Configuración aplicada", 
                    type: "success", 
                    isLoading: false, 
                    autoClose:3000, 
                    position: "bottom-center", 
                    hideProgressBar: false
                })
            })
        } else {
            setIsEmpty(true)
            reset()
        }
    }

    return (
        <Modal title="Actualizar configuraciones" id="change-config" show={isEditing} onClose={() => setIsEditing(false)} confirmButton={sendButton}>
            <>
                <form id="change-config" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                        <h3 className="font-text text-md md:text-xl mt-3 ml-1 mb-1">Moneda base</h3>
                        <select className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" {...register("currency", {onChange: (e) => {
                            setValue("currency", e.target.value, {shouldValidate: true})
                        }})}>
                            <option value="">Selecciona una moneda</option>
                            <option value="ARS">Pesos argentinos</option>
                            <option value="EUR">Euros</option>
                            <option value="USD">Dolares</option>
                        </select>
                        <p>{errors.currency?.message}</p>
                    <div className={`${isEmpty ? "mb-0" : "mb-6"}`}>
                        <h3 className="font-text text-md md:text-xl mt-3 ml-1 mb-1">Idioma</h3>
                        <p className="font-text text-md md:text-xl mt-3 ml-1 mb-1">Actualmente el unico idioma soportado es el español</p>
                    </div>
                </form>
                {isEmpty && <p className="font-text text-2xl w-full text-center mb-4 mt-2">Debes ingresar por lo menos un cambio</p>}
            </>
        </Modal>
    )
}
export default ConfigurationEditor