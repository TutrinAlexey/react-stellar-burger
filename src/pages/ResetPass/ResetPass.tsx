import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPass.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  emailSent,
  error,
  formPending,
  isPassReset,
} from "../../services/selector/authenticationSelector";
import { fetchResetPassword } from "../../services/thunk/authenticationQuery";
import { clearError } from "../../services/slice/authenticationSlice";
import { useEffect, FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const ResetPass: FC = () => {
  const navigate = useNavigate();
  const pendingForm = useAppSelector(formPending);
  const sentEmail = useAppSelector(emailSent);
  const errorMessage = useAppSelector(error);
  const isResetPass = useAppSelector(isPassReset);
  const { values, errors, isFormValidate, handleChange } = useForm();
  const [hiddenPass, setHiddenPass] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [values]);

  if (isResetPass) {
    return <Navigate to={"/login"} />;
  }

  if (!sentEmail) {
    return <Navigate to={"/forgot-password"} />;
  }

  const handleForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      fetchResetPassword({ password: values.password, token: values.code })
    );
  };
  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
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
          name="resetpass-form"
          onSubmit={handleForm}
        >
          <Input
            type={hiddenPass ? "text" : "password"}
            placeholder={"Введите новый пароль"}
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
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.code || ""}
            name={"code"}
            error={!!errors.code}
            errorText={errors.code}
            size={"default"}
            extraClass="mt-6"
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!isFormValidate || pendingForm}
          >
            {pendingForm ? "Сохранение" : "Сохранить"}
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

export default ResetPass;
