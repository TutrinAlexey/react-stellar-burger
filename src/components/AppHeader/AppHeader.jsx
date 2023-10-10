import styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../NavigationLink/NavigationLink";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader(props) {
  return (
    <header className={`mb-10 ${styles.header}`}>
      <nav className={`pt-4 pb-4 ${styles.navigation}`}>
        <div className={styles.container}>
          <NavigationLink isActive={true}>
            <BurgerIcon type="primary" />
            Конструктор
          </NavigationLink>
          <NavigationLink isActive={false}>
            <ListIcon type="secondary" />
            Лента заказов
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink isActive={false}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavigationLink>
      </nav>
    </header>
  );
}

export default AppHeader;
