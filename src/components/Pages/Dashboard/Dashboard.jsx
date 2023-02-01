import { auth } from "../../../config/firebase";
import { useUserContext } from "../../../context/UserContext";
import Login from "../Login/Login";

const Dashboard = () => {
    const {user} = useUserContext()
    if(user) {
        const photo = user.photoURL
        return (
            <div>
                <p>Bienvenido {user.email}</p>
                <button className="bg-primary" onClick={()=>signOut(auth)}>Cerrar sesión</button>
                <img src={photo} referrerPolicy="no-referrer" />
            </div>
        )
    } else {
        return <Login/>
    }
}

export default Dashboard