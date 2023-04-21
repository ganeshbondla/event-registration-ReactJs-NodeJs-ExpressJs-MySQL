import { Navigate } from "react-router-dom";

const PrivateRoute = ({child}) => {
    const jwt = true;
    return jwt ? child : <Navigate to="/login" />;
}

export default PrivateRoute;
