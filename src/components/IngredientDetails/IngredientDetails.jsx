import styles from "./IngredientDetails.module.css";
import PropTypes from 'prop-types'

function IngredientDetails(props) {
  return (
    <div className={`pt-10 pr-10 pl-10 pb-15 ${styles.container}`}>
      <h3 className={`text text_type_main-large ${styles.title} mt-3 mb-3`}>
        Детали ингредиента
      </h3>
      <img
        src={props.data.image_large}
        alt={props.data.name}
      />
      <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>
        {props.data.name}
      </p>
      <ul className={`${styles.list}`}>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Калории,ккал
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {props.data.calories}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Белки, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {props.data.proteins}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Жиры, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {props.data.fat}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Углеводы, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            10,2
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.object,
}

export default IngredientDetails;
