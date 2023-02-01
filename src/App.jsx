import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import UserContextProvider from "./context/UserContext";

import './App.css'

function App() {

    return (
        <UserContextProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App
