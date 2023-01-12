import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHook";

const RequireAuth = ({ children }: any) => {

  const user = useAppSelector((state)=> state.user)

  if ( !user.isAuth ) {
    return <Navigate to="/signin"/>
  }

  return children;
};

export default RequireAuth;