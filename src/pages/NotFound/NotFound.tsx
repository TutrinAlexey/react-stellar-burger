import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import { FC } from "react";

const NotFound: FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className={`${styles.container}`}>
      <p className="text text_type_main-large text_color_inactive">Ошибка</p>
      <p className="text text_type_digits-large text_color_inactive pb-5">
        404
      </p>
      <p className="text text_type_main-large text_color_inactive pb-6">
        Страница не найдена
      </p>
      <button
        onClick={onClick}
        className={`text text_type_main-default text_color_inactive ${styles.button}`}
      >
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFound;
