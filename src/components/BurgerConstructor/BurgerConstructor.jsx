import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

function BurgerConstructor(props) {
  const img = "https://code.s3.yandex.net/react/code/bun-02.png";

  return (
    <section className={`mt-15 ${styles.section}`}>
      <ul className={`custom-scroll ${styles.list}`}>
        <li className="ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className={styles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </li>
        <li className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </li>
      </ul>
      <div className={`mt-10  pr-4 ${styles.bottom}`}>
        <p className={`text text_type_digits-medium ${styles.orderPrice}`}>
          610
          <CurrencyIcon type="primary" />
        </p>
        <Button onClick={props.openOrder} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
  openOrder: PropTypes.func,
}

export default BurgerConstructor;
