import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../../../../config/firebase"
import { useUserContext } from "../../../../../../context/UserContext"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import fx from "money";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

//TODO Agregar botones de 10% 50% y MAX abajo del monto


const TransferForm = ({transfering, setTransfering}) => {
    const {user, updateCurrentUser} = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)
    const [baseAccount, setBaseAccount] = useState()
    const [targetAccounts, setTargetAccounts] = useState([])
    const currenciesData = useOutletContext()

    const generateTransferSchema = yup.object({
        baseAccount: yup.string().required("Selecciona una cuenta origen"),
        balance: yup.number().positive("Ingresa un monto valido").max(baseAccount?.balance, "El monto ingresado es mayor al de la cuenta de origen").required("Debes ingresar un monto").typeError("El campo ingresado debe ser un numero"),
        targetAccount: yup.string().required("Debes seleccionar una cuenta destino"),
        reference: yup.string()
    })

    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm({resolver: yupResolver(generateTransferSchema)})

    useEffect(() => {
        if(baseAccount){
            setTargetAccounts(user.accounts.filter(account => account.name !== baseAccount.name))
        }
    }, [baseAccount])


    const transferBalance = async (base, target, balance) => {
        const updatedBase = {...base, balance: base.balance - balance}
        const elementsToUpdate = [base, target]
        
        if(target.currency !== base.currency){
            fx.base = "USD"
            fx.rates = {...currenciesData, "USDT": 1, "USDC": 1}
            const updatedBalance = fx.convert(balance, {from:base.currency, to:target.currency})
            const updatedTarget = {...target, balance: target.balance + updatedBalance}
            const updatedElements = [updatedBase, updatedTarget]
            await updateDoc(queryUser, {
                accounts: arrayRemove(...elementsToUpdate)
            })
            await updateDoc(queryUser, {
                accounts: arrayUnion(...updatedElements)
            })
        } else {
            const updatedTarget = {...target, balance: target.balance + balance}
            const updatedElements = [updatedBase, updatedTarget]
            await updateDoc(queryUser, {
                accounts: arrayRemove(...elementsToUpdate)
            })
            await updateDoc(queryUser, {
                accounts: arrayUnion(...updatedElements)
            })
        }
    }

    const onSubmit = async (data) => {
        const base = JSON.parse(data.baseAccount)
        const target = JSON.parse(data.targetAccount)
        setTransfering(true)
        const transferToast = toast.loading("Realizando transferencia", {position: "bottom-center"})
        const activity = {
            typeName: "transfer",
            typeIcon: "mingcute:transfer-3-line",
            amount: data.balance,
            currency: base.currency,
            baseAccount: base.name,
            targetAccount: target.name,
            reference: data.reference,
        }
        if(user.lastActivities.length === 10) {
            user.lastActivities.shift()
            user.lastActivities.push(activity)
        } else {
            user.lastActivities.push(activity)
        }
        await updateDoc(queryUser, {
            lastActivities: user.lastActivities
        })
        await transferBalance(base, target, data.balance)
        .then(() => {
            updateCurrentUser()
            reset()
        })
        .finally(()=> {
            setTransfering(false)
            toast.update(transferToast, {
                render:"Transferencia realizada", 
                type: "success", 
                isLoading: false, 
                autoClose:3000, 
                position: "bottom-center", 
                hideProgressBar: false
            })
        })
    }

    return (
        <div className="p-6 w-full">
            <form className="flex flex-col p-4 sm:p-8 gap-4 bg-real-white dark:bg-black dark:text-white shadow-lg rounded-xl w-full justify-center" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Transferencias</h2>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Cuenta origen</h3>
                    <select className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" name="baseAccount" id="baseAccount" {...register("baseAccount", {onChange: (e) => {
                        setBaseAccount(JSON.parse(e.target.value))
                        setValue("baseAccount", e.target.value, {shouldValidate: true})
                    }})}>
                        <option value="">Selecciona cuenta origen</option>
                        {user.accounts?.map((account) => {
                            return <option key={account.name+account.currency} value={JSON.stringify(account)}>{account.name}</option>
                        })}
                    </select>
                    <p className="font-text ml-1">{errors.baseAccount?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Balance</h3>
                    <input className="font-text dark:bg-black text-md md:text-xl pt-2 border-b focus:outline-none border-primary-interact px-3 w-full" type="text" {...register("balance")} placeholder="Balance a transferir"/>
                    <p className="font-text ml-1">{errors.balance?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Cuenta destino</h3>
                    <select className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" name="targetAccount" id="targetAccount" {...register("targetAccount", {onChange: (e)=>{
                        setValue("targetAccount", e.target.value, {shouldValidate:true})
                    }})}>
                        <option value="">Selecciona cuenta destino</option>
                        {targetAccounts?.map(account => {
                            return <option key={account.name+account.currency} value={JSON.stringify(account)}>{account.name}</option>
                        })}
                    </select>
                    <p className="font-text ml-1">{errors.targetAccount?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Referencia</h3>
                    <input className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" type="text" {...register("reference")} placeholder="Pantalon, corte de pelo, bebdia..."/>
                    <p className="font-text ml-1 dark:text-white">{errors.reference?.message}</p>
                </div>
                <button disabled={transfering} className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8" type="submit">Transferir</button>
            </form>
        </div>
    )
}
export default TransferForm