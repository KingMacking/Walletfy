import { useUserContext } from "../../../../../context/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import fx from "money";
import { useOutletContext } from "react-router-dom";
import useColorMode from "../../../../../hooks/useColorMode";

ChartJS.register(ArcElement, Tooltip, Legend)


const TotalBalance = () => {
    const {user} = useUserContext()
    const currenciesData = useOutletContext()
    const [colorMode, setColorModer] = useColorMode()
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


    const data = {
        labels: ['Billeteras virtuales', 'Efectivo', 'Bancos', 'Cryptos'],
        datasets: [
            {
                label: "$",
                data: [virtualWalletsBalance, cashBalance, bankBalance,  cryptoBalance],
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
        <div className="p-6">
            <div className="shadow-lg rounded-xl p-6 bg-real-white dark:bg-black dark:text-white flex justify-center items-center md:items-start md:justify-between flex-col md:flex-row md:w-fit gap-10 md:gap-6 sm:max-w-full h-auto">
                <div className={`w-full ${user.accounts.length > 0 ? "md:w-auto" : "md:w-[350px]"}`}>
                    <h3 className="font-title text-2xl border-b border-primary-interact py-1 mb-4">Saldo total</h3>
                    <p className="font-text text-5xl">${(Math.round(totalBalance * 100) / 100).toFixed(2)} <span className="text-lg">{user.currency}</span></p>
                </div>
                <div className={`w-auto ${user.accounts.length === 0 && "hidden"}`}>
                    <Doughnut className="!flex !flex-col max-w-[250px]" data={data} options={{
                        plugins:{legend:{position: "bottom", labels: {font: {family: "sans-serif", size: 12}, color: "#7c7c7c" }}},
                        maintainAspectRatio: true,
                        responsive: true,
                        borderColor: "#ffffff00"
                    }}/>
                </div>
            </div>
        </div>
    )
}
export default TotalBalance