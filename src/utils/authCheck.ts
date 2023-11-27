import { fetchUserInfo } from "../services/thunk/authenticationQuery";
import { setAuthChecked, setUser } from "../services/slice/authenticationSlice";
import { AppDispatch } from "./types/hooksTypes";

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUserInfo())
        .catch(() => {
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
