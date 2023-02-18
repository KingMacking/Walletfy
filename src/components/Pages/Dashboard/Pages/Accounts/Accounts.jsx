import { useUserContext } from "../../../../../context/UserContext";
import NewAccountForm from "./NewAccountForm";

//TODO Realizar en otro archivo una lista de las cuentas para poder eliminar las mismas (dropdown quizas e implementar edicion)



const Accounts = () => {
    const {user} = useUserContext()
    return (
        <main>
            <NewAccountForm user={user} />
        </main>
    )
}
export default Accounts