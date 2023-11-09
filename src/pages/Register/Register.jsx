import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";

function Register() {
  const navigate = useNavigate();
  const [hiddenPass, setHiddenPass] = useState(false);
  const { values, errors, isFormValidate, handleChange } = useForm();

  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };
  const handleForm = (evt) => {
    evt.preventDefault();
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>
          Регистрация
        </h2>
        <form
          className={styles.form}
          name="register-form"
          onSubmit={handleForm}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name || ""}
            name={"name"}
            error={!!errors.name}
            errorText={errors.name}
            size={"default"}
            extraClass="mt-6"
            minLength={4}
            maxLength={15}
            required
          />
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
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            onClick={() => navigate("/login")}
            disabled={!isFormValidate}
          >
            Зарегистрироваться
          </Button>
        </form>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          Уже зарегистрированы?
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

export default Register;
