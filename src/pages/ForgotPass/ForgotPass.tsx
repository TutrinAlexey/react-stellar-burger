import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPass.module.css";
import { useEffect, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  error,
  formPending,
} from "../../services/selector/authenticationSelector";
import { fetchForgotPassword } from "../../services/thunk/authenticationQuery";
import {
  setEmailSent,
  clearError,
} from "../../services/slice/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const ForgotPass: FC = () => {
  const navigate = useNavigate();
  const { values, errors, isFormValidate, handleChange } = useForm();
  const pendingForm = useAppSelector(formPending);
  const errorMessage = useAppSelector(error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [values]);

  const handleForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchForgotPassword(values.email));
    dispatch(setEmailSent(true));
    navigate("/reset-password");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2
          className={`text text_type_main-medium ${
            errorMessage ? styles.error : styles.title
          }`}
        >
          Восстановление пароля
        </h2>
        <span className={`text_type_main-default ${styles.error}`}>
          {errorMessage}
        </span>
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
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!isFormValidate || pendingForm}
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
};
export default ForgotPass;
