import styles from "./NavigationLink.module.css";
import PropTypes from 'prop-types'
import clsx from 'clsx'

function NavigationLink({isActive, children}) {
  return (
    <a 
      className={`pt-4 pr-5 pb-4 pl-5 text text_type_main-default ${
        clsx(styles.link, {
          [styles.link_active]: isActive,
        })
      }`}
      href="#"
    >
      {children}
    </a>
  );
}


NavigationLink.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.array,
}

export default NavigationLink;
