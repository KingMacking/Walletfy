import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUserContext } from "../../../../../../context/UserContext";
import { db } from '../../../../../../config/firebase'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";

const generateAccountSchema = yup.object({
    name: yup.string().required("Nombre de la cuenta obligatorio"),
    category: yup.string().oneOf(["bank", "cash", "crypto", "virtual-wallet"], "Debes seleccionar una categoria").required("Elige la categoria de la cuenta"),
    currency: yup.string().oneOf(["USD", "ARS", "EUR", "BTC", "ETH", "USDT", "DOGE", "USDC", "XRP",], "Debes seleccionar una moneda").required("Elige la moneda de la cuenta"),
    balance: yup.number().positive("Ingresa un balance inicial valido").required("Debes ingresar un balance inicial").typeError("El campo ingresado debe ser un numero")
})

const NewAccountForm = () => {
    const {user, updateCurrentUser} = useUserContext()
    const queryUser =  doc(db, 'users', user.uid)
    const [category, setCategory] = useState('')
    const [currencies, setCurrencies] = useState([])

    const {register, handleSubmit, reset, formState, setValue, formState: {errors}} = useForm({resolver: yupResolver(generateAccountSchema)})
    
    useEffect(()=>{
        if (category === "bank") {
            setCurrencies([{name: "USD", label: "Dolar EE.UU."}, {name: "ARS", label: "Pesos argentinos"}, {name: "EUR", label: "Euros"}])
        } else if (category === "crypto") {
            setCurrencies([{name: "BTC", label: "Bitcoin"}, {name: "ETH", label: "Ethereum"}, {name: "USDT", label: "Tether"}, {name: "USDC", label: "USD Coin"}, {name: "XRP", label: "XRP"}, {name: "DOGE", label: "Dogecoin"} ])
        } else if (category === "cash") {
            setCurrencies([{name: "USD", label: "Dolar EE.UU."}, {name: "ARS", label: "Pesos argentinos"}, {name: "EUR", label: "Euros"}])
        } else if (category === "virtual-wallet") {
            setCurrencies([{name: "USD", label: "Dolar EE.UU."}, {name: "ARS", label: "Pesos argentinos"}, {name: "EUR", label: "Euros"}])
        } else {
            setCurrencies([])
        }
    }, [category])

    const addAccount = async (accountData) => {
        const account = {
            name: accountData.name,
            category: accountData.category,
            currency: accountData.currency,
            balance: parseFloat(accountData.balance)
        }
        const addAccountToast = toast.loading("Agregando cuenta", {position: "bottom-center"})
        await updateDoc(queryUser, {
            accounts: arrayUnion(account)
        }, {merge: true})
        .then(() => {
            updateCurrentUser()
            reset()
            toast.update(addAccountToast, {
                render:"Cuenta agregada", 
                type: "success", 
                isLoading: false, 
                autoClose:3000, 
                position: "bottom-center", 
                hideProgressBar: false
            })
        })
    }
    
    
    const onSubmit = (data) => {
        addAccount(data)
    }

    
    return (
        <div className="p-6 w-full">
            <form className="flex flex-col p-4 sm:p-8 gap-4 bg-real-white dark:bg-black dark:text-white shadow-lg rounded-xl w-full justify-center" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">Nueva cuenta</h2>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Nombre de la cuenta</h3>
                    <input className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" type="text" {...register("name")} placeholder="Efectivo, Banco Prueba, PayPal..."/>
                    <p className="font-text dark:text-white ml-1">{errors.name?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Tipo de cuenta</h3>
                    <select className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" {...register("category", {onChange: (e) => {
                        setCategory(e.target.value)
                        setValue("category", e.target.value, {shouldValidate:true})
                    }})}>
                        <option value="">Seleccionar tipo de cuenta</option>
                        <option value="cash">Efectivo</option>
                        <option value="bank">Cuenta bancaria</option>
                        <option value="crypto">Crypto</option>
                        <option value="virtual-wallet">Billetera virtual</option>
                    </select>
                    <p className="font-text dark:text-white ml-1">{errors.category?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Moneda en la que se basa la cuenta</h3>
                    <select className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" {...register("currency", {onChange: (e) => {
                        setValue("currency", e.target.value, {shouldValidate:true})
                    }})}>
                        <option value="">Elija la moneda de la cuenta</option>
                        {currencies && currencies.map((currency) => {
                            return (
                            <option key={currency.name} value={currency.name}>
                                {currency.label}
                            </option>)
                        })}
                    </select>
                    <p className="font-text dark:text-white ml-1">{errors.currency?.message}</p>
                </div>
                <div>
                    <h3 className="font-text text-md md:text-xl mt-3 ml-1">Balance inicial de la cuenta</h3>
                    <input className="font-text dark:bg-black text-md md:text-xl py-2 border rounded-lg border-primary-interact px-3 w-full" type="text" {...register("balance")} placeholder="100, 3000, 123456..."/>
                    <p className="font-text dark:text-white ml-1">{errors.balance?.message}</p>
                </div>
                <button className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8" type="submit">Agregar cuenta</button>
            </form>
        </div>
    )
}
export default NewAccountForm