import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPass.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

function ForgotPass() {
  const navigate = useNavigate();
  const { values, errors, isFormValidate, handleChange } = useForm();
  const handleForm = (evt) => {
    evt.preventDefault();
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h2>
        <form
          className={styles.form}
          name="forgotpass-form"
          onSubmit={handleForm}
        >
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
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
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!isFormValidate}
            onClick={() => navigate("/reset-password")}
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
export default ForgotPass;
