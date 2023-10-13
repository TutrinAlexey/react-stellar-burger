import styles from "./IngredientsContainer.module.css";
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types'


function IngredientsContainer(props) {
  return (
    <li>
      <h2 className="text text_type_main-medium mt-10 mb-6">{props.name}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {props.data.map((el) => (
          <Ingredient key={el._id} data={el} openIngredient={props.openIngredient}></Ingredient>
        ))}
      </ul>
    </li>
  );
}

IngredientsContainer.propTypes = {
  data: PropTypes.array,
  openIngredient: PropTypes.func,
  name: PropTypes.string,
}

export default IngredientsContainer;
