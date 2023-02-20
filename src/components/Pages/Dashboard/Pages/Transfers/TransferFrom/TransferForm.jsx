import { doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../../../../config/firebase"
import { useUserContext } from "../../../../../../context/UserContext"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";


//TODO Transferencia en firebase entre cuentas, currencies se obtienen el context del outlet


const TransferForm = () => {
    const {user} = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)
    const [baseAccount, setBaseAccount] = useState()
    const [targetAccounts, setTargetAccounts] = useState([])
    
    const generateTransferSchema = yup.object({
        baseAccount: yup.string().required("Selecciona una cuenta origen"),
        balance: yup.number("El balance debe ser un numero").positive("Ingresa un monto valido").max(baseAccount?.balance, "El monto ingresado es mayor al de la cuenta de origen"),
        targetAccount: yup.string().required("Debes seleccionar una cuenta destino")
    })

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({resolver: yupResolver(generateTransferSchema)})

    useEffect(() => {
        console.log(baseAccount);
        if(baseAccount){
            setTargetAccounts(user.accounts.filter(account => account.name !== baseAccount.name))
        }
    }, [baseAccount])
    const onSubmit = (data) => {
        console.log(data);
        const base = JSON.parse(data.baseAccount)
        const target = JSON.parse(data.targetAccount)
        console.log(base, target);
    }

    return (
        <div className="p-6 w-full">
            <form className="flex flex-col p-4 sm:p-8 gap-4 bg-[#ffffff] shadow-lg rounded-xl w-full justify-center sm:max-w-full" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Transferencias</h2>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Cuenta origen</h3>
                    <select className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" name="baseAccount" id="baseAccount" {...register("baseAccount", {onChange: (e) => {
                        setBaseAccount(JSON.parse(e.target.value))
                        setValue("baseAccount", e.target.value, {shouldValidate: true})
                    }})}>
                        <option value="">Selecciona cuenta orien</option>
                        {user.accounts.map((account) => {
                            return <option key={account.name+account.currency} value={JSON.stringify(account)}>{account.name}</option>
                        })}
                    </select>
                    <p>{errors.baseAccount?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Balance</h3>
                    <input className="font-text text-md md:text-xl pt-2 border-b focus:outline-none border-primary-interact px-3 w-full" type="text" {...register("balance")} placeholder="Balance a transferir"/>
                    <p>{errors.balance?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Cuenta destino</h3>
                    <select className="font-text text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" name="targetAccount" id="targetAccount" {...register("targetAccount", {onChange: (e)=>{
                        setValue("targetAccount", e.target.value, {shouldValidate:true})
                    }})}>
                        <option value="">Selecciona cuenta destino</option>
                        {targetAccounts.map(account => {
                            return <option key={account.name+account.currency} value={JSON.stringify(account)}>{account.name}</option>
                        })}
                    </select>
                    <p>{errors.targetAccount?.message}</p>
                </div>
                <button className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8" type="submit">Transferir</button>
            </form>
        </div>
    )
}
export default TransferForm