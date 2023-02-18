import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({user, children}) => {
    if (!user) {
        return <Navigate to="/login" />
    }

    return children ? children : <Outlet />
}
export default ProtectedRoutes