import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Accounts from "./components/Pages/Dashboard/Pages/Accounts/Accounts";
import Main from "./components/Pages/Dashboard/Pages/Main/Main";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import { useUserContext } from "./context/UserContext";
import ProtectedRoutes from "./hooks/ProtectedRoutes";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Transfers from "./components/Pages/Dashboard/Pages/Transfers/Transfers";

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
                        </Route>
                    </Route>
                </Routes>
            </QueryClientProvider>
            <Footer />
        </>
    );
}

export default App
