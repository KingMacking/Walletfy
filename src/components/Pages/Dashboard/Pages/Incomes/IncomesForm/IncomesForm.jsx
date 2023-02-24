import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../../../config/firebase"
import { useUserContext } from "../../../../../../context/UserContext"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import INCOMES_TYPES from "../../../../../../data/IncomesTypes";

const IncomesForm = ({transfering, setTransfering}) => {
    const {user, updateCurrentUser } = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)

    const generateIncomeSchema = yup.object({
        baseAccount: yup.string().required("Selecciona una cuenta"),
        type: yup.string().required("Debes seleccionar una tipo"),
        balance: yup.number().positive("Ingresa un monto valido")
    })

    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm({resolver: yupResolver(generateIncomeSchema)})

    const onSubmit = async (data) => {
        const baseAccount = JSON.parse(data.baseAccount)
        const updatedAccount = {...baseAccount, balance: baseAccount.balance + data.balance}
        setTransfering(true)
        await updateDoc(queryUser, {
            accounts: arrayRemove(baseAccount)
        })
        await updateDoc(queryUser, {
            accounts: arrayUnion(updatedAccount)
        })
        .then(() => {
            updateCurrentUser()
            reset()
        })
        .finally(() => {
            setTransfering(false)
        })
    }
    
    return (
        <div className="p-6 w-full">
            <form className="flex flex-col p-4 sm:p-8 gap-4 bg-[#ffffff] shadow-lg rounded-xl w-full justify-center" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Ingresos</h2>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Cuenta</h3>
                    <select className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" name="baseAccount" id="baseAccount" {...register("baseAccount", {onChange: (e) =>{
                        setValue("baseAccount", e.target.value, {shouldValidate: true})
                    }})}>
                        <option value="">Seleccionar cuenta</option>
                        {user.accounts?.map((account)=> {
                            return <option key={account.name+account.currency} value={JSON.stringify(account)}>{account.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Tipo</h3>
                    <select className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" {...register("type", {onChange: (e) => {
                        setValue("type", e.target.value, {shouldValidate: true})
                    }})}>
                        <option value="">Seleccionar tipo de ingreso</option>
                        {INCOMES_TYPES.map((income)=>{
                            return <option key={income} value={income.toLowerCase()}>{income}</option>
                        })}
                    </select>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Balance</h3>
                    <input className="font-text text-md md:text-xl pt-2 border-b focus:outline-none border-primary-interact px-3 w-full" type="text" {...register("balance")} placeholder="123, 300, 4000..."/>
                </div>
                <button disabled={transfering && true} className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8" type="submit">Registrar ingreso</button>
            </form>
        </div>
    )
}
export default IncomesForm