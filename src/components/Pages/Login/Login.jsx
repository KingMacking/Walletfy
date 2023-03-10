import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";
import { Icon } from "@iconify/react";
import { useUserContext } from "../../../context/UserContext";
import { useEffect } from "react";

const generteLoginSchema = yup.object().shape({
    email: yup.string().email('Debes ingresar un email valido').required('Email requerido'),
    password: yup.string().required('Contraseña necesaria')
})

const Login = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(generteLoginSchema)})

    const navigate = useNavigate()

    const {user} = useUserContext()
    
    useEffect(() => {
        user && navigate("/dashboard/main")
    }, [user])

    const submitLogin = async (data) => {
        const email = data.email
        const password = data.password
        await signInWithEmailAndPassword(auth, email, password)
        .catch(error => {
            if (error) {
                console.log(error.message);
            }
        })
    }

    const handleGoogleLogin = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    return (
        <div className="h-full py-10 bg-white dark:bg-blacker dark:text-white">
            <h2 className="mx-auto text-center font-title text-4xl border-b-2 w-fit border-primary px-3 py-2">Iniciar sesión</h2>
            <form className="bg-real-white dark:bg-black flex flex-col px-5 py-8 mx-auto h-auto my-12 shadow-lg rounded-xl w-[300px] sm:w-[350px] md:w-[400px]" onSubmit={handleSubmit(submitLogin)}>
                {/*Email input*/}
                <h3 className="font-text text-xl ml-1">Email:</h3>
                <input className="font-text text-xl py-2 border rounded-lg border-primary-interact px-3 dark:bg-black" type="email" {...register("email")} />
                {errors.email && <p className="font-text text-primary-interact ml-1">{errors.email.message}</p>}
                {/*Password input*/}
                <h3 className="font-text text-xl mt-3 ml-1">Contraseña:</h3>
                <input className="font-text text-xl py-2 border rounded-lg border-primary-interact px-3 dark:bg-black" type="password" {...register("password")} />
                {errors.password && <p className="font-text text-primary-interact ml-1">{errors.password.message}</p>}
                {/*Submit button*/}
                <button className="bg-primary text-white text-xl font-text mt-8 py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out" type="submit">Iniciar sesión</button>
                <div className="flex items-center my-5">
                    <div className="flex-grow h-px bg-primary-interact"></div>
                    <p className="text-center text-xl flex-shrink px-4">o continuar con</p>
                    <div className="flex-grow h-px bg-primary-interact"></div>
                </div>
                <button className="bg-primary text-white text-xl font-text py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out" onClick={handleGoogleLogin}>Google</button>
                <p className="text-lg font-text mt-4 py-2 text-center">¿No tienes cuenta? <Link to="/register" className="hover:underline hover:decoration-primary-interact underline-offset-4 transition-all ease-in-out font-text font-bold">Registrarse</Link></p>
                <Link to="/" className="bg-primary text-white text-xl font-text mt-2 py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out flex justify-center items-center w-20 mx-auto"><Icon icon="material-symbols:home" inline={true} /></Link>
            </form>
        </div>
    )
}

export default Login