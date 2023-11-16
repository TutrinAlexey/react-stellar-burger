import { useDispatch, useSelector } from "react-redux";
import styles from "./Protected.module.css";
import { isLogin, user } from "../../services/selector/authenticationSelector";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, FC } from "react";
import { setAuthChecked } from "../../services/slice/authenticationSlice";
import { checkUserAuth } from "../../utils/authCheck";

type ProtectedProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuth = useSelector(isLogin);
  const userInfo = useSelector(user);
  const location = useLocation();

  if (onlyUnAuth && userInfo) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userInfo) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = (props: any) => (
  <Protected onlyUnAuth={false} {...props} />
);
export const OnlyUnAuth = (props: any) => (
  <Protected onlyUnAuth={true} {...props} />
);
