import styles from "./NavigationLink.module.css";
import { NavLink } from "react-router-dom";
import { FC } from "react";

type NavigationLinkProps = {
  isActive: boolean;
  way: string;
  chooseLink: () => void;
};

const NavigationLink: FC<NavigationLinkProps> = ({
  isActive,
  way,
  children,
  chooseLink,
}) => {
  return (
    <NavLink
      onClick={chooseLink}
      to={way}
      className={`pt-4 pr-5 pb-4 pl-5 text text_type_main-default ${
        isActive ? styles.link_active : styles.link
      }`}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
