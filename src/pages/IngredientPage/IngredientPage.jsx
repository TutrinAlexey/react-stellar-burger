import { useParams } from "react-router-dom";
import styles from "./IngredientPage.module.css";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import NotFound from "../NotFound/NotFound";
import { getIngredients } from "../../services/selector/ingredientsSelector";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function IngredientPage() {
  const { id } = useParams();
  const ingredients = useSelector(getIngredients);
  const dataOfIngredients = useMemo(() => {
    return ingredients.find((ingredient) => ingredient._id === id);
  }, [ingredients, id]);

  return dataOfIngredients ? (
    <div className={`pt-20 ${styles.container}`}>
      <IngredientDetails center={true} dataOfIngredients={dataOfIngredients} />
    </div>
  ) : (
    <NotFound />
  );
}

export default IngredientPage;
