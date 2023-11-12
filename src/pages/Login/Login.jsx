import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../../services/thunk/authenticationQuery";
import { useEffect } from "react";
import {
  error,
  formPending,
} from "../../services/selector/authenticationSelector";
import { setError } from "../../services/slice/authenticationSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pendingForm = useSelector(formPending);
  const errorMessage = useSelector(error);
  const { values, errors, isFormValidate, handleChange } = useForm();
  const [hiddenPass, setHiddenPass] = useState(false);
  useEffect(() => dispatch(setError("")), [values]);

  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };

  const handleForm = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchLoginUser({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2
          className={`text text_type_main-medium ${
            errorMessage ? styles.error : styles.title
          }`}
        >
          Вход
        </h2>
        <span className={`text_type_main-default ${styles.error}`}>
          {errorMessage}
        </span>
        <form className={styles.form} name="login-form" onSubmit={handleForm}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            error={!!errors.email}
            errorText={errors.email}
            size={"default"}
            extraClass="mt-6"
            minLength={8}
            maxLength={25}
            required
          />
          <Input
            type={hiddenPass ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={hiddenPass ? "HideIcon" : "ShowIcon"}
            value={values.password || ""}
            name={"password"}
            error={!!errors.password}
            onIconClick={onIconClick}
            errorText={errors.password}
            size={"default"}
            extraClass={"mt-6"}
            required
            minLength={6}
            maxLength={20}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!isFormValidate || pendingForm}
          >
            {pendingForm ? "Вход" : "Войти"}
          </Button>
        </form>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          Вы — новый пользователь?
          <Button
            onClick={() => navigate("/register")}
            htmlType="submit"
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
