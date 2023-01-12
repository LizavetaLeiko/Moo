import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHook";

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsAuth(user.isAuth);
  }, []);

  if (!isAuth) {
    return navigate("/signin");
  }

  return children;
};

export default RequireAuth;
