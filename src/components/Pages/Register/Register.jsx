import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";

const generateLoginSchema = yup.object().shape({
    email: yup.string().email('Ingresa un email valido').required('Por favor ingresa un email'),
    password: yup.string().required('Por favor ingresa una contraseña'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
})

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(generateLoginSchema)})
    const navigate = useNavigate()
    

    const submitRegister = async (data) => {
        const email = data.email
        const password = data.password
        await createUserWithEmailAndPassword(auth, email, password)
        // const docRef = doc(users, userInfo.user.uid)
        // await setDoc(docRef, {email: email, thumbnail: ""})
        .finally(
            navigate("/dashboard")
        )
    }

    const signUpWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
        // const docRef = doc(users, userInfo.user.uid)
        // await setDoc(docRef, {email: userInfo.user.email, thumbnail: userInfo.user.photoURL})
        .finally(navigate("/dashboard"))
    }

    return (
        <div className="h-full py-10">
            <h2 className="mx-auto text-center font-title text-4xl border-b-2 w-fit border-primary px-3 py-2">Registrarse</h2>
            <form className="bg-base flex flex-col px-5 py-8 mx-auto h-auto my-12 border border-primary-interact rounded-2xl w-[300px] sm:w-[350px] md:w-[400px]" onSubmit={handleSubmit(submitRegister)}>
                {/*Email input*/}
                <h3 className="font-text text-xl mt-3 ml-1">Email:</h3>
                <input className="font-text text-xl py-1 border rounded-lg border-primary px-3" type="email" {...register("email")} />
                {errors.email && <p className="font-text text-primary-interact ml-1">{errors.email.message}</p>}
                {/*Password input*/}
                <h3 className="font-text text-xl mt-3 ml-1">Contraseña:</h3>
                <input className="font-text text-xl py-1 border rounded-lg border-primary px-3" type="password" {...register("password")} />
                {errors.password && <p className="font-text text-primary-interact ml-1">{errors.password.message}</p>}
                {/*Confirm password input*/}
                <h3 className="font-text text-xl mt-3 ml-1">Confirmar contraseña:</h3>
                <input className="font-text text-xl py-1 border rounded-lg border-primary px-3" type="password" {...register("passwordConfirmation")} />
                {errors.passwordConfirmation && <p className="font-text text-primary-interact ml-1">{errors.passwordConfirmation.message}</p>}
                {/*Submit button*/}
                <button type="submit" className="bg-primary text-white text-xl font-text mt-8 py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out">Registrarse</button>
                <Link to="/" className="bg-primary text-white text-xl font-text mt-2 py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out text-center">Volver a inicio</Link>
            </form>
                <button onClick={signUpWithGoogle} className="bg-primary text-white text-xl font-text mt-2 py-4 rounded-xl hover:bg-primary-interact transition-all ease-in-out">Registrarse con Google</button>
            {/* <div>
                <button onClick={handleGoogleLogin}>Google</button>
            </div> */}
        </div>
    )
}

export default Register