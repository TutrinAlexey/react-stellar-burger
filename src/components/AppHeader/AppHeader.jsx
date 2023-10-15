import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../NavigationLink/NavigationLink";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from 'react'

function AppHeader(props) {
  const [activate, setActive] = useState({
    burger: true,
    order: false,
    profile: false,
  })
  return (
    <header className={` ${styles.header}`}>
      <nav className={`pt-4 pb-4 ${styles.navigation}`}>
        <div className={styles.container}>
          <NavigationLink isActive={activate.burger}>
            <BurgerIcon type={activate.burger ? "primary" : "secondary"} />
            Конструктор
          </NavigationLink>
          <NavigationLink isActive={activate.order}>
            <ListIcon type={activate.order ? "primary" : "secondary"} />
            Лента заказов
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink isActive={activate.profile}>
          <ProfileIcon type={activate.profile ? "primary" : "secondary"} />
          Личный кабинет
        </NavigationLink>
      </nav>
    </header>
  );
}

export default AppHeader;
