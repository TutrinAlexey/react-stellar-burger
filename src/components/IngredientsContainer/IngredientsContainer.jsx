import styles from "./IngredientsContainer.module.css";
import Ingredient from "../Ingredient/Ingredient";

function IngredientsContainer(props) {
  return (
    <li>
      <h2 className="text text_type_main-medium mt-10 mb-6">{props.name}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {props.data.map((el) => (
          <Ingredient key={el._id} data={el}></Ingredient>
        ))}
      </ul>
    </li>
  );
}

export default IngredientsContainer;
