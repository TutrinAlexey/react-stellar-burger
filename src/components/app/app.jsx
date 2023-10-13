import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import Modals from "../Modals/Modals";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
  const api = "https://norma.nomoreparties.space/api/ingredients";
  const [order, setOrder] = useState(false)
  const [state, setState] = useState(data);
  const [visible, setVisible] = useState(false);
  const [ingredient, setIngredient] = useState(null)
  
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(
        (result) => {
          setState(result.data);
        },
        (e) => console.log(`Ошибка: ${e}`)
      );
  }, []);


  const openModalOrder = (e) => {
    setOrder(true)
  }

  const openModalIngredient = (e) => {
    const info = state.find((el) => {if(el.image === e.target.src){return el}})
    setIngredient(info)
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setOrder(false)
  };


  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      <AppMain data={state} openIngredient={openModalIngredient} openOrder={openModalOrder}></AppMain>
      {visible && (
        <Modals onClose={closeModal}>
          <IngredientDetails data={ingredient}></IngredientDetails>
        </Modals>
      )}
      {order && (
        <Modals onClose={closeModal}>
          <OrderDetails></OrderDetails>
        </Modals>
      )}
    </div>
  );
}

export default App;
