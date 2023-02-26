import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { Waveform } from '@uiball/loaders'
import ActivitiesBar from "./ActivitiesBar/ActivitiesBar";

const Dashboard = () => {
    const {data: currenciesData, isLoading} = useQuery(["cryptos"], () => {
        return Axios.request('https://openexchangerates.org/api/latest.json?app_id=c0796e7967fd4da6979537610239de14&show_alternative=1').then(res => res.data)
    })
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen w-full">
                    <Waveform size={80} lineWeight={5.5} speed={1} color="#372274" />
                </div>
            ) : (
                <div className="flex min-h-screen h-auto w-full">
                    <Sidebar />
                    <Outlet context={currenciesData?.rates} />
                    <ActivitiesBar />
                </div>
            )}
        </>
    )
}

export default Dashboard