import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../NavigationLink/NavigationLink";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import {
  accountStatus,
  burgerStatus,
  orderListStatus,
} from "../../services/selector/linkSelector";
import {
  accountLink,
  burgerLink,
  orderListLink,
} from "../../services/slice/linkSlice";
import { memo } from "react";
import { Link } from "react-router-dom";

function AppHeader() {
  const dispatch = useDispatch();
  const burgerActive = useSelector(burgerStatus);
  const orderActive = useSelector(orderListStatus);
  const accountActive = useSelector(accountStatus);

  return (
    <header className={` ${styles.header}`}>
      <nav className={`pt-4 pb-4 ${styles.navigation}`}>
        <div className={styles.container}>
          <NavigationLink
            isActive={burgerActive}
            way={"/"}
            chooseLink={() => dispatch(burgerLink())}
          >
            <BurgerIcon type={burgerActive ? "primary" : "secondary"} />
            Конструктор
          </NavigationLink>
          <NavigationLink
            isActive={orderActive}
            way={"/order-list"}
            chooseLink={() => dispatch(orderListLink())}
          >
            <ListIcon type={orderActive ? "primary" : "secondary"} />
            Лента заказов
          </NavigationLink>
        </div>
        <div className={styles.logo}>
          <Link to={"/"}>
            <Logo extraClass={styles.logo} />
          </Link>
        </div>
        <NavigationLink
          isActive={accountActive}
          way={"/profile/user"}
          chooseLink={() => dispatch(accountLink())}
        >
          <ProfileIcon type={accountActive ? "primary" : "secondary"} />
          Личный кабинет
        </NavigationLink>
      </nav>
    </header>
  );
}

export default memo(AppHeader);
