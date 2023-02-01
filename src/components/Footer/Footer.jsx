import { Link } from 'react-router-dom'
import logoFooter from '../../assets/walletfy-logo-text-b.svg'

// TODO: Hacer que el body siempre tenga 100vh y poner el footer siempre abajo

const Footer = () => {
    return (
        <footer className='bg-base w-full'>
            <nav className='flex flex-col md:flex-row md:justify-around justify-start items-start w-full px-5 py-10'>
                <div className='self-start md:self-center md:my-0 my-5 w-60'>
                    <Link><img className='w-full' src={logoFooter} alt="Logo walletfy" /></Link>
                </div>
                <ul className="list-none md:mb-0 mb-10">
                    <h2 className='font-title font-bold text-lg'>Navegación</h2>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>Dashboard</Link>
                    </li>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>FAQ's</Link>
                    </li>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>Sobre nosotros</Link>
                    </li>
                </ul>
                <ul className="list-none md:mb-0 mb-10">
                    <h2 className='font-title font-bold text-lg'>Links utiles</h2>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>¿Como funciona?</Link>
                    </li>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>Estado de las API's</Link>
                    </li>
                </ul>
                <ul className="list-none md:mb-0 mb-10">
                    <h2 className='font-title font-bold text-lg'>Contacto</h2>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>Email</Link>
                    </li>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>Instagram</Link>
                    </li>
                    <li>
                        <Link className='hover:underline hover:decoration-primary underline-offset-4 transition-all ease-in-out font-text'>LinkedIn</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer