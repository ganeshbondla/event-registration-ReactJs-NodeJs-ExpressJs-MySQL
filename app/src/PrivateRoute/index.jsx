import { useNavigate } from "react-router-dom";

const PrivateRoute = ({child}) => {
    const navigate = useNavigate();
    const jwt = true;
    return jwt ? child : navigate('/login');
}

export default PrivateRoute;