import { Icon } from "@iconify/react"
import { Waveform } from "@uiball/loaders"
import fx from "money"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useUserContext } from "../../../../../../context/UserContext"
import ProfileEditor from "../ProfileEditor/ProfileEditor"

const ProfileCard = ({isUpdating, setIsUpdating}) => {
    const {user} = useUserContext()
    const currenciesData = useOutletContext()
    const [isEditing, setIsEditing] = useState(false)



    fx.base = "USD"
    // fx.rates = currenciesData || {"USD":24598.97,"BTC":1,"EUR":22877.04,"GBP":20425.93,"PLN":108390.86,"CZK":540666.98,"SEK":252912.0,"NOK":252912.0,"DKK":175092.92,"CHF":22536.71,"ZAR":455241.6,"AUD":35565.75,"JPY":3251725.71,"NZD":39244.97,"TRY":458912.9,"BRL":126456.0,"CAD":32988.52,"CNY":162586.29,"HKD":189684.0,"HUF":8754646.15,"INR":2014343.36,"ILS":87546.46,"MYR":108390.86,"MXN":455241.6,"SGD":32517.26,"RON":113810.4,"IDR":227620800.0,"PHP":1346868.64,"ARS":4742100.0,"THB":836841.18,"NGN":11381040.0,"PKR":6503451.43,"AED":91048.32,"UAH":896144.88,"BGN":44631.53,"HRK":175092.92,"RSD":2677891.76,"LTC":248.0774,"ETH":14.6049,"BCH":182.5284,"XRP":62695.92,"CLP":18968400.0,"TRX":352113.0,"DAI":24608.57,"DOGE":280112.0,"BNB":78.2228,"USDT":24617.18,"BTCV":9050.59,"KRW":32517257.14,"EGP":746297.7,"SAR":91048.32,"QAR":87546.46,"USDC":24617.54,"ADA":60827.25,"BUSD":24611.82}
    fx.rates = {...currenciesData, "USDT": 1, "USDC": 1}
    
    const getBalance = (accountCategory) => {
        let balance = 0
        const accounts = user.accounts.filter((account) => {
            return account.category === accountCategory
        })
        accounts.forEach((account) => {
            balance += fx.convert(account.balance, {from: account.currency, to: user.currency})
        })
        return balance
    }

    const bankBalance = getBalance("bank")
    const cashBalance = getBalance("cash")
    const virtualWalletsBalance = getBalance("virtual-wallet")
    const cryptoBalance = getBalance("crypto")
    const totalBalance = bankBalance + cashBalance + virtualWalletsBalance + cryptoBalance



    return (
        <div className="p-6 w-full">
            <div className="flex flex-col p-4 sm:p-8 gap-4 bg-real-white dark:bg-black dark:text-white shadow-lg rounded-xl justify-center items-center w-full md:w-[530px]">
            {
                isUpdating ? <Waveform className="w-full" size={80} lineWeight={5.5} speed={1} color="#372274" />
                :
                    <>
                            <img className="rounded-full border-2 border-primary-interact w-1/4" src={user.thumbnail} />
                            <h2 className="text-center font-title text-3xl md:text-4xl border-primary border-b-2 py-1 px-2 w-fit mx-auto mb-4">{user.displayName}</h2>
                            <div className="w-full ml-6 flex flex-col gap-4 my-4">
                                <p className="font-text text-xl w-full flex items-center gap-2"><Icon className="text-white rounded-full bg-primary p-2 text-4xl" icon="material-symbols:account-balance-wallet-outline-rounded" inline={true} />Cantidad de cuentas: {user.accounts.length}</p>
                                <p className="font-text text-xl w-full flex items-center gap-2"><Icon className="text-white rounded-full bg-primary p-2 text-4xl" icon="majesticons:money-line" inline={true} />Saldo total: ${(Math.round(totalBalance * 100) / 100).toFixed(2)}</p>
                            </div>
                            <button className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out mt-8 px-4" onClick={ () => setIsEditing(true)}>Editar usuario</button>
                    </>
            }
            </div>
            <ProfileEditor setIsUpdating={setIsUpdating} isEditing={isEditing} setIsEditing={setIsEditing}/>
        </div>
    )
}
export default ProfileCard