import { NavLink } from 'react-router-dom'
import styles from './ProfileNavigation.module.css'

function ProfileNavigation({explanation}) {

 return (
    <nav className={`${styles.tabs}`}>
          <NavLink
            to={"/profile/"}
            className={({isActive}) => isActive ? (`pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`) : (`pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`)}
          >
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/order-history"}
            className={({isActive}) => isActive ? (`pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`) : (`pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`)}
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/"}
            className={({isActive}) => isActive ? (`pt-5 pb-5 text text_type_main-medium ${styles.tab_active}`) : (`pt-5 pb-5 text text_type_main-medium text_color_inactive ${styles.tab}`)}
          >
            Выход
          </NavLink>
          <p
            className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}
          >
            {explanation}
          </p>
        </nav>
 )
}

export default ProfileNavigation