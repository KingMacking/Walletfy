import { Icon } from '@iconify/react'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../../../config/firebase'
import useColorMode from '../../../../hooks/useColorMode'

import walletfyIcon from '../../../../assets/walletfy-logo-icon.svg'

const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const [colorMode, setColorMode] = useColorMode()
    const navigate = useNavigate()


    const logOut = async () => {
        try {
            await signOut(auth)
            .finally(navigate("/login"))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`bg-primary min-h-full  ${open ? "w-80" : 'w-20'} text-white px-4 duration-500 -left-16 ${open && "-left-0"} sm:-left-0 fixed`}>
            <Icon className={`text-3xl cursor-pointer bg-white text-primary rounded-full absolute -right-3 p-1 top-[26px] border-2 border-primary duration-500 ${open && "rotate-180"}`} onClick={()=> setOpen(!open)} icon="material-symbols:play-arrow-rounded" inline={true} />
            <div className='mt-4 flex flex-col gap-4'>
                <div className={`flex items-center p-2 gap-3 ${!open && "w-fit"}`}>
                    <img src={walletfyIcon} className="bg-white rounded block py-2 px-1 w-8" />
                    <h2 className={`text-white font-title text-lg whitespace-pre duration-300 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Walletfy</h2>
                </div>
                <div className='h-[2px] bg-primary-interact'></div>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out ${!open && "w-fit"} mt-4`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/main"><div><Icon className='text-3xl' icon="material-symbols:dashboard" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Dashboard</h2></NavLink>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/profile"><div><Icon className='text-3xl' icon="mdi:user" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Perfil</h2></NavLink>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out mb-4`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/accounts"><div><Icon className='text-3xl'  icon="material-symbols:account-balance-wallet-outline-rounded" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Cuentas</h2></NavLink>
                <div className='h-[2px] bg-primary-interact'></div>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out ${!open && "w-fit"} mt-4`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/incomes"><div><Icon className='text-3xl' icon="majesticons:money-plus-line" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Ingresos</h2></NavLink>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/payments"><div><Icon className='text-3xl' icon="majesticons:money-minus-line" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Pagos</h2></NavLink>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out mb-4`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/transfers"><div><Icon className='text-3xl'  icon="mingcute:transfer-3-line" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Transferencias</h2></NavLink>
                <div className='h-[2px] bg-primary-interact'></div>
                <NavLink onClick={() => setOpen(false)} className={({isActive}) => [`border border-primary flex items-center gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out ${!open && "w-fit"} mt-4`, isActive && "border border-primary-interact"].join(" ") } to="/dashboard/configuration"><div><Icon className='text-3xl' icon="material-symbols:settings-rounded" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Configuración</h2></NavLink>
                <button onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")} className={`flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-primary-interact rounded-md transition-all ease-in-out`}><div><Icon className='text-3xl' icon={colorMode === 'dark' ? "ph:moon-fill" :"ph:sun-fill"} inline={true}/></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Cambiar tema</h2></button>
                <button onClick={logOut} className={`flex items-center ${!open && "w-fit"} gap-3 font-text p-2 hover:bg-[#ff000080] rounded-md transition-all ease-in-out`}><div><Icon className='text-3xl' icon="dashicons:exit" inline={true} /></div><h2 className={`font-title text-lg whitespace-pre duration-500 ${!open && 'hidden translate-x-28 overflow-hidden'}`}>Cerrar sesión</h2></button>
            </div>
        </div>
    )
}

export default Sidebar