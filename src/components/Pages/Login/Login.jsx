import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";

// TODO: Dar estilos, navigate al dashboard
const generteLoginSchema = yup.object().shape({
    email: yup.string().email('Debes ingresar un email valido').required('Email requerido'),
    password: yup.string().required('Contraseña necesaria')
})

const Login = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(generteLoginSchema)})

    const navigate = useNavigate()

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
        .finally(navigate("/dashboard"))
    }

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(submitLogin)}>
                {/*Email input*/}
                <h3>Email:</h3>
                <input type="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
                {/*Password input*/}
                <h3>Contraseña:</h3>
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
                {/*Submit button*/}
                <button className="bg-primary" type="submit">Iniciar sesión</button>
            </form>
            <div>
                <button className="bg-primary" onClick={handleGoogleLogin}>Google</button>
            </div>
        </div>
    )
}

export default Login