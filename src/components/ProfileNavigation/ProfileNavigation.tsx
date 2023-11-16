import { NavLink, useLocation } from "react-router-dom";
import styles from "./ProfileNavigation.module.css";
import { useDispatch } from "react-redux";
import { fetchLogoutUser } from "../../services/thunk/authenticationQuery";
import { FC } from "react";

const ProfileNavigation: FC = () => {
  const link = useLocation().pathname;
  const dispatch = useDispatch();
  const handleExit = () => {
    dispatch(fetchLogoutUser());
  };
  return (
    <nav className={`${styles.tabs}`}>
      <NavLink
        to={"/profile/user"}
        className={({ isActive }) =>
          isActive
            ? `pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`
            : `pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to={"/profile/order-history"}
        className={({ isActive }) =>
          isActive
            ? `pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`
            : `pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`
        }
      >
        История заказов
      </NavLink>
      <NavLink
        onClick={handleExit}
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? `pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`
            : `pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`
        }
      >
        Выход
      </NavLink>
      <p
        className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}
      >
        {link === "/profile/user"
          ? "В этом разделе вы можете изменить свои персональные данные"
          : link === "/profile/order-history"
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : null}
      </p>
    </nav>
  );
};

export default ProfileNavigation;
