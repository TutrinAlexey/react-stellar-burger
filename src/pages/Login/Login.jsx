import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState("value");
  const [hiddenPass, setHiddenPass] = useState(false);
  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };
  const handleForm = (evt) => {
    evt.preventDefault();
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
        <form className={styles.form} name="login-form" onSubmit={handleForm}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={''}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            minLength={8}
            maxLength={25}
            required
          />
          <Input
            type={hiddenPass ? "text" : "password"}
            placeholder={"Пароль"}
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
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
          >
            Войти
          </Button>
        </form>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          Вы — новый пользователь?
          <Button
            onClick={() => navigate("/register")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.link}
          >
            Зарегистрироваться
          </Button>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive mt-4 ${styles.text}`}
        >
          Забыли пароль?
          <Button
            onClick={() => navigate("/forgot-password")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.link}
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </section>
  );
}

export default Login;
