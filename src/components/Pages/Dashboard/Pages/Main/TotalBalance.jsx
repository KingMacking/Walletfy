import { useUserContext } from "../../../../../context/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import fx from "money";
import { useOutletContext } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend)


const TotalBalance = () => {
    const {user} = useUserContext()
    const currenciesData = useOutletContext()
    console.log(currenciesData);
    fx.base = "BTC"
    fx.rates = currenciesData
    
    
    const getBalance = (accountCategory) => {
        let balance = 0
        const accounts = user.accounts.filter((account) => {
            return account.category === accountCategory
        })
        const foreignAccounts = accounts.filter((account) => {
            return account.currency !== "ARS"
        })
        if (foreignAccounts.length > 0) {
            foreignAccounts.forEach((account) => {
                return balance += fx.convert(account.balance, {from: account.currency, to: user.currency})
            })
        } else {
            accounts.forEach((account) => {
                return balance += account.balance
            })
        }
        return balance
    }

    const bankBalance = getBalance("bank")
    const cashBalance = getBalance("cash")
    const virtualWalletsBalance = getBalance("virtual-wallet")
    const cryptoBalance = getBalance("crypto")
    const totalBalance = bankBalance + cashBalance + virtualWalletsBalance + cryptoBalance


    const data = {
        labels: ['Efectivo', 'Bancos', 'Billeteras virtuales', 'Cryptos'],
        datasets: [
            {
                label: "$",
                data: [cashBalance, bankBalance,  virtualWalletsBalance, cryptoBalance],
                backgroundColor: [
                    '#372274',
                    '#7A62B8',
                    '#A693D7',
                    '#E4DBF9'
                ]
            }
        ]
    }
    return (
        <div className="shadow-lg rounded-xl bg-[#ffffff] p-6 sm:p-6 flex justify-center sm:justify-between w-fit gap-10 md:gap-6 flex-wrap max-w-[300px] sm:max-w-full ml-6">
            <div className="w-full md:w-auto">
                <h3 className="font-title text-2xl border-b border-primary-interact py-1 mb-4">Saldo total</h3>
                <p className="font-text text-5xl">${(Math.round(totalBalance * 100) / 100).toFixed(2)}</p>
            </div>
            <div className="max-w-[300px]">
                <Doughnut className="!flex !flex-col" data={data} options={{
                    plugins:{legend:{position: "bottom", labels: {font: {family: "sans-serif", size: 14} }}},
                    maintainAspectRatio: false
                }}/>
            </div>
        </div>
    )
}
export default TotalBalance