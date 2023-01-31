import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import './App.css'
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";

function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
