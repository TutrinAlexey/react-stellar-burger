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
            chooseLink={() => dispatch(burgerLink())}
          >
            <BurgerIcon type={burgerActive ? "primary" : "secondary"} />
            Конструктор
          </NavigationLink>
          <NavigationLink
            isActive={orderActive}
            chooseLink={() => dispatch(orderListLink())}
          >
            <ListIcon type={orderActive ? "primary" : "secondary"} />
            Лента заказов
          </NavigationLink>
        </div>
        <div className={styles.logo}>
          <Logo extraClass={styles.logo} />
        </div>
        <NavigationLink
          isActive={accountActive}
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
