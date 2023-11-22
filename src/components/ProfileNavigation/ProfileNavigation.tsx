import { NavLink, useLocation } from "react-router-dom";
import styles from "./ProfileNavigation.module.css";
import { fetchLogoutUser } from "../../services/thunk/authenticationQuery";
import { FC } from "react";
import { useAppDispatch } from "../../utils/types/hooksTypes";

const ProfileNavigation: FC = () => {
  const link = useLocation().pathname;
  const dispatch = useAppDispatch();
  const handleExit = () => {
    dispatch(fetchLogoutUser());
  };
  return (
    <section className={`pt-20 ${styles.container}`}>
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
        to={"/profile/orders"}
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
          : link === "/profile/orders"
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : null}
      </p>
    </nav>
    </section>
  );
};

export default ProfileNavigation;
