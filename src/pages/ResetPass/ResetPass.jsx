import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPass.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPass() {
  const navigate = useNavigate();
  const [value, setValue] = useState("value");
  const handleForm = (evt) => {
    evt.preventDefault();
  };
  const [hiddenPass, setHiddenPass] = useState(false);
  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h2>
        <form
          className={styles.form}
          name="resetpass-form"
          onSubmit={handleForm}
        >
          <Input
            type={hiddenPass ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={(e) => setValue(e.target.value)}
            icon={hiddenPass ? "HideIcon" : "ShowIcon"}
            value={''}
            name={"password"}
            error={false}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={"mt-6"}
            required
            minLength={6}
            maxLength={20}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setValue(e.target.value)}
            value={""}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            required
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
          >
            Восстановить
          </Button>
        </form>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          Вспомнили пароль?
          <Button
            onClick={() => navigate("/login")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.link}
          >
            Войти
          </Button>
        </p>
      </div>
    </section>
  );
}

export default ResetPass;
