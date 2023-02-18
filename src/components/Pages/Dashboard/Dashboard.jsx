import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { Waveform } from '@uiball/loaders'


const Dashboard = () => {
    const {data: currenciesData, isLoading} = useQuery(["cryptos"], () => {
        return Axios.get('https://api.coingate.com/v2/rates/merchant').then(res=>res.data)
    })
    return (
        <div className="flex h-auto">
            {isLoading ? (
                <Waveform className="justify-self-center self-center" size={80} lineWeight={5.5} speed={1} color="#372274" />
            ) : (
                <>
                    <Sidebar />
                    <Outlet context={currenciesData?.BTC} />
                </>
            )}
        </div>
    )
}

export default Dashboard