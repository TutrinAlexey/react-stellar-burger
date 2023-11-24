import { fetchUserInfo } from "../services/thunk/authenticationQuery";
import { setAuthChecked, setUser } from "../services/slice/authenticationSlice";


export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUserInfo())
        .catch((error) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(false));
      dispatch(setUser(null));
    }
  };
};
