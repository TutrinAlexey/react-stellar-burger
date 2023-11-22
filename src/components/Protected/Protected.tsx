import styles from "./Protected.module.css";
import { isLogin, user } from "../../services/selector/authenticationSelector";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, FC } from "react";
import { checkUserAuth } from "../../utils/authCheck";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

type ProtectedProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

type OnlyAuthProps = {
  component: JSX.Element;
};
const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuth = useAppSelector(isLogin) as boolean;
  const userInfo = useAppSelector(user) as { name: string; email: string };
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

export const OnlyAuth: FC<OnlyAuthProps> = (props) => (
  <Protected onlyUnAuth={false} {...props} />
);
export const OnlyUnAuth: FC<OnlyAuthProps> = (props) => (
  <Protected onlyUnAuth={true} {...props} />
);
