import styles from "./NavigationLink.module.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

function NavigationLink({ isActive, way, children, chooseLink }) {
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
}

NavigationLink.propTypes = {
  isActive: PropTypes.bool,
  way: PropTypes.string,
  children: PropTypes.array,
  chooseLink: PropTypes.func,
};

export default NavigationLink;
