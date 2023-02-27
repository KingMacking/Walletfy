import { Routes, Route} from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Accounts from "./components/Pages/Dashboard/Pages/Accounts/Accounts";
import Main from "./components/Pages/Dashboard/Pages/Main/Main";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Transfers from "./components/Pages/Dashboard/Pages/Transfers/Transfers";
import Incomes from "./components/Pages/Dashboard/Pages/Incomes/Incomes";
import Payments from "./components/Pages/Dashboard/Pages/Payments/Payments";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import Profile from "./components/Pages/Dashboard/Pages/Profile/Profile";
import Configuration from "./components/Pages/Dashboard/Pages/Configuration/Configuration";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {user} = useUserContext()
    const client = new QueryClient({defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }})
    return (
        <>
            <Navbar />
            <QueryClientProvider client={client}>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route element={<ProtectedRoutes user={user} />} >
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route path="main" element={<Main />} />
                            <Route path="accounts" element= {<Accounts />} />
                            <Route path="transfers" element= {<Transfers />} />
                            <Route path="incomes" element= {<Incomes />} />
                            <Route path="payments" element= {<Payments />} />
                            <Route path="profile" element= {<Profile />} />
                            <Route path="configuration" element={<Configuration />} />
                        </Route>
                    </Route>
                </Routes>
            </QueryClientProvider>
            <ToastContainer limit={5} />
            <Footer />
        </>
    );
}

export default App
