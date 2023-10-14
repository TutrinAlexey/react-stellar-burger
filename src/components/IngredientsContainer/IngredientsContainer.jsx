import styles from "./IngredientsContainer.module.css";
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types'


function IngredientsContainer({filterIngredients, openIngredient, name, id}) {
  return (
    <li id={id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{name}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {filterIngredients.map((el) => (
          <Ingredient key={el._id} ingredient={el} openIngredient={openIngredient} />
        ))}
      </ul>
    </li>
  );
}

IngredientsContainer.propTypes = {
  id: PropTypes.string,
  filterIngredients: PropTypes.array,
  openIngredient: PropTypes.func,
  name: PropTypes.string,
}

export default IngredientsContainer;
