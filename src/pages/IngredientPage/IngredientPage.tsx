import styles from "./IngredientPage.module.css";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { FC } from "react";

const IngredientPage: FC = () => {
  return (
    <div className={`pt-20 ${styles.container}`}>
      <IngredientDetails center={true} />
    </div>
  );
};

export default IngredientPage;
