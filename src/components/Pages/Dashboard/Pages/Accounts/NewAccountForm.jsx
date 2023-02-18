import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUserContext } from "../../../../../context/UserContext";
import { db } from '../../../../../config/firebase'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const generateAccountSchema = yup.object({
    name: yup.string().required("Nombre de la cuenta obligatorio"),
    category: yup.string().oneOf(["bank", "cash", "crypto", "virtual-wallet"], "Debes seleccionar una categoria").required("Elige la categoria de la cuenta"),
    currency: yup.string().oneOf(["USD", "ARS", "EUR", "BTC", "ETH", "USDT", "BTC", "BNB", "USDC", "XRP", "ADA", "MATIC", "SOL"], "Debes seleccionar una moneda").required("Elige la moneda de la cuenta"),
    balance: yup.number().positive("Ingresa un balance inicial valido").required("Debes ingresar un balance inicial")
})

const NewAccountForm = () => {
    const {user} = useUserContext()
    const [category, setCategory] = useState('')
    const [currencies, setCurrencies] = useState([])

    const {register, handleSubmit, formState, setValue, formState: {errors}} = useForm({resolver: yupResolver(generateAccountSchema)})
    
    useEffect(()=>{
        if (category === "bank") {
            setCurrencies([{name: "USD", label: "Dolar EE.UU."}, {name: "ARS", label: "Pesos argentinos"}, {name: "EUR", label: "Euros"}])
        } else if (category === "crypto") {
            setCurrencies([{name: "BTC", label: "Bitcoin"}, {name: "ETH", label: "Ethereum"}, {name: "USDT", label: "Tether"}, {name: "BNB", label: "BNB"}, {name: "USDC", label: "USD Coin"}, {name: "XRP", label: "XRP"}, {name: "ADA", label: "Cardano"}, {name: "DOGE", label: "Dogecoin"} ])
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
        const queryUser =  doc(db, 'users', user.uid)

        await updateDoc(queryUser, {
            accounts: arrayUnion(account)
        }, {merge: true})
    }
    
    const onSubmit = (data) => {
        addAccount(data)
    }

    console.log(formState.errors);

    
    return (
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} placeholder="Nombre de la cuenta"/>
                <p>{errors.name?.message}</p>
                <select {...register("category", {onChange: (e) => {
                    setCategory(e.target.value)
                    setValue("category", e.target.value, {shouldValidate:true})
                }})}>
                    <option value="">Seleccionar tipo de cuenta</option>
                    <option value="cash">Efectivo</option>
                    <option value="bank">Cuenta bancaria</option>
                    <option value="crypto">Crypto</option>
                    <option value="virtual-wallet">Billetera virtual</option>
                </select>
                <p>{errors.category?.message}</p>
                <select {...register("currency", {onChange: (e) => {
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
                <p>{errors.currency?.message}</p>
                <input type="text" {...register("balance")} placeholder="Balance de la cuenta"/>
                <p>{errors.balance?.message}</p>
                <button className="bg-primary" type="submit">Agregar cuenta</button>
            </form>
    )
}
export default NewAccountForm