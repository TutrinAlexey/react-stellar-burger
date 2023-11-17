import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../NavigationLink/NavigationLink";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const burgerActive = useAppSelector(burgerStatus) as boolean;
  const orderActive = useAppSelector(orderListStatus) as boolean;
  const accountActive = useAppSelector(accountStatus) as boolean;

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
            <Logo />
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
};

export default memo(AppHeader);
