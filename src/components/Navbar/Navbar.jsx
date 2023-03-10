import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import useColorMode from "../../hooks/useColorMode"
import LogoText from "../LogoText/LogoText"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [navVisibility, setNavVisibility] = useState(null)
    const [colorMode, setColorMode] = useColorMode()
    const mainPages = ["/", "/contact", "/aboutus", "/faq", "/functioning", "/register", "/login"]
    const location = useLocation()

    useEffect(()=> {
        if (mainPages.includes(location.pathname)){
            setNavVisibility(true)
        } else {
            setNavVisibility(false)
        }
    }, [location])

    if (navVisibility){
        return (
            <header className="bg-white dark:bg-black dark:text-white">
                <nav className={`flex md:justify-around justify-center items-center w-full sticky border-b-primary border-b-2 md:px-7 px-5 h-auto`}>
                    <div className="md:w-auto w-full flex justify-between items-center p-5">
                        <Link to="/"><LogoText width="175" textColor={colorMode === 'dark' ? "#FDFDFD" : "#171717"} /></Link>
                        <Icon onClick={()=>setOpen(!open)} className="text-3xl md:hidden" icon={`${open ? "material-symbols:close" : "material-symbols:menu-rounded"}`} inline={true} />
                    </div>
                    <div className='md:flex hidden items-center px-6'>
                        <ul className="md:flex hidden items-center gap-6 list-none">
                            <li>
                                <Link className='hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out font-text'>¿Como funciona?</Link>
                            </li>
                            <li>
                                <Link className='hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out font-text'>¿Quienes somos?</Link>
                            </li>
                            <li>
                                <Link className='hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out font-text'>Contacto</Link>
                            </li>
                            <li>
                                <Link className='hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out font-text'>FAQ's</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:flex hidden items-center justify-self-end gap-1'>
                        <Link to="/login" className='border-[1.5px] border-transparent hover:border-primary rounded-full px-5 py-2 transition-all ease-in-out font-text'>Iniciar sesión</Link>
                        <Link to="/register" className='bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-interact transition-all ease-in-out font-text'>Registrarse</Link>
                        <button onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")} className={`flex items-center text-white bg-primary gap-3 font-text p-2 hover:bg-primary-interact rounded-full transition-all ease-in-out`}><div><Icon className='text-2xl' icon={colorMode === 'dark' ? "ph:moon-fill" :"ph:sun-fill"} inline={true}/></div></button>
                    </div>
    
                    {/*Mobile nav*/}
                    <ul className={`md:hidden fixed w-full top-0 overflow-y-auto bg-white dark:bg-black bottom-0 gap-8 list-none py-24 pl-4 duration-200 ${open ? "left-0" : "left-[-100%]" }`}>
                        <li className="mt-7 px-5">
                            <Link className='hover:underline hover:decoration-primary underline-offset-8 transition-all ease-in-out font-text'>¿Como funciona?</Link>
                        </li>
                        <li className="mt-7 px-5">
                            <Link className='hover:underline hover:decoration-primary underline-offset-8 transition-all ease-in-out font-text'>¿Quienes somos?</Link>
                        </li>
                        <li className="mt-7 px-5">
                            <Link className='hover:underline hover:decoration-primary underline-offset-8 transition-all ease-in-out font-text'>Contacto</Link>
                        </li>
                        <li className="mt-7 px-5">
                            <Link className='hover:underline hover:decoration-primary underline-offset-8 transition-all ease-in-out font-text'>FAQ's</Link>
                        </li>
                        <div className='flex items-center justify-self-end gap-3 mt-12'>
                            <Link to="/login" className='border-[1.5px] border-transparent hover:border-primary rounded-full px-5 py-2 transition-all ease-in-out duration-100'>Iniciar sesión</Link>
                            <Link to="/register" className='bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-interact transition-all ease-in-out'>Registrarse</Link>
                        <button onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")} className={`flex items-center text-white bg-primary gap-3 font-text p-2 hover:bg-primary-interact rounded-full transition-all ease-in-out`}><div><Icon className='text-2xl' icon={colorMode === 'dark' ? "ph:moon-fill" :"ph:sun-fill"} inline={true}/></div></button>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Navbar