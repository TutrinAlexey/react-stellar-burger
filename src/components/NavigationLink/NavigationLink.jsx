import styles from "./NavigationLink.module.css";

function NavigationLink(props) {
  return (
    <a
      className={`pt-4 pr-5 pb-4 pl-5 text text_type_main-default ${
        props.isActive === true ? styles.link_active : styles.link
      }`}
      href=""
    >
      {props.children}
    </a>
  );
}

export default NavigationLink;
