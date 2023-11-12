import { useDispatch, useSelector } from "react-redux";
import styles from "./Protected.module.css";
import { isLogin, user } from "../../services/selector/authenticationSelector";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from 'react'
import { setAuthChecked } from "../../services/slice/authenticationSlice";
import { checkUserAuth } from "../../utils/authCheck";

function Protected({ onlyUnAuth = false, component }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])

  const isAuth = useSelector(isLogin);
  const userInfo = useSelector(user)
  const location = useLocation();



  if(onlyUnAuth && userInfo) {
    const {from} = location.state || {from: {pathname: '/'}}
    return <Navigate to={from}/>
  }

  if(!onlyUnAuth && !userInfo) {
    return <Navigate to={'/login'} state={{from: location}} />
  }

  return component
}

export const OnlyAuth = (props) => <Protected onlyUnAuth={false} {...props} />
export const OnlyUnAuth = (props) => <Protected onlyUnAuth={true} {...props} />