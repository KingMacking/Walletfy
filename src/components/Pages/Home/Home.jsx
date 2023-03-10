import { Link } from 'react-router-dom'
import homeMainImg from '../../../assets/walletfy-home-img.svg'
const Home = () => {
    return (
        <div className='px-15 py-12 bg-white dark:bg-blacker h-fit'>
            <div className='flex flex-col items-center justify-center gap-12 py-20 lg:flex-row lg:items-start'>
                <div className='w-3/5 lg:w-[40%] xl:w-[30%] lg:mt-10 xl:mt-5'>
                    <img className='w-full' src={homeMainImg} alt="Girl with big wallet and coins"/>
                </div>
                <div className='flex flex-col w-4/5 lg:w-[50%] xl:w-[40%] mt-20 lg:mt-14 xl:mt-30 dark:text-white'>
                    <h2 className='font-title text-6xl font-bold mb-3 text-center lg:text-start'>Controlar tu economia nunca fue tan fácil</h2>
                    <p className='font-text text-xl mb-14 text-center lg:text-start'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis ullam necessitatibus sunt inventore natus ab iusto rem recusandae architecto amet optio, sit doloribus neque et eaque impedit sapiente nemo a.</p>
                    <Link to="/register" className='bg-primary text-white px-8 py-5 rounded-full font-title transition-all ease-in-out w-72 self-center text-center text-4xl lg:self-start hover:bg-primary-interact'>COMENZAR</Link>
                </div>
            </div>
        </div>
    )
}

export default Home