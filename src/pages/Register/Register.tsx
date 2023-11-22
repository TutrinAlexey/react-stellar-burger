import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState, useEffect, FC, FormEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { fetchRegisterUser } from "../../services/thunk/authenticationQuery";
import {
  error,
  formPending,
} from "../../services/selector/authenticationSelector";
import { clearError } from "../../services/slice/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import { TErrors, TValues } from "../../utils/types/useFormTypes";

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(error) as string;
  const pendingForm = useAppSelector(formPending) as boolean;
  const [hiddenPass, setHiddenPass] = useState(false);
  const { values, errors, isFormValidate, handleChange } = useForm();

  useEffect(() => {
    dispatch(clearError());
  }, [values]);

  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };
  const handleForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      fetchRegisterUser({
        email: values.email,
        password: values.password,
        name: values.name,
      })
    );
    if (pendingForm) {
      navigate("/login");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2
          className={`text text_type_main-medium ${
            errorMessage ? styles.error : styles.title
          }`}
        >
          Регистрация
        </h2>
        <span className={`text_type_main-default ${styles.error}`}>
          {errorMessage}
        </span>
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
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!isFormValidate || pendingForm}
          >
            {pendingForm ? "Регистрация" : "Зарегистрироваться"}
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
};

export default Register;
