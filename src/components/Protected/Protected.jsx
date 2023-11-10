import { useSelector } from "react-redux";
import styles from "./Protected.module.css";
import { isLogin, user } from "../../services/selector/authenticationSelector";
import { Navigate, useLocation } from "react-router-dom";

function Protected({ onlyUnAuth = false, component }) {
  const isAuth = useSelector(isLogin);
  const userInfo = useSelector(user)
  const location = useLocation();

  if(!isAuth) {
    return null
  }

  if(onlyUnAuth && userInfo) {
    const {from} = location.state || {from: {pathname: '/'}}
    return <Navigate to={from}/>
  }

  if(!onlyUnAuth && !userInfo) {
    return <Navigate to={'/login'} state={{from: location}} />
  }

  return component
}

export const OnlyAuth = (props) => <Protected onlyAnAuth={false} {...props} />
export const OnlyUnAuth = (props) => <Protected onlyAnAuth={true} {...props} />