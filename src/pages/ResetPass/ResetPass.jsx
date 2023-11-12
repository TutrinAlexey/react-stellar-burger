import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPass.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  emailSent,
  error,
  formPending,
  isLogin,
  message,
} from "../../services/selector/authenticationSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../../services/thunk/authenticationQuery";
import { setError, setMessage } from "../../services/slice/authenticationSlice";
import { useEffect } from "react";

function ResetPass() {
  const navigate = useNavigate();
  const isAuth = useSelector(isLogin);
  const pendingForm = useSelector(formPending);
  const sentEmail = useSelector(emailSent);
  const msg = useSelector(message);
  const errorMessage = useSelector(error);
  const location = useLocation();
  const { values, errors, isFormValidate, handleChange } = useForm();
  const [hiddenPass, setHiddenPass] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessage(""));
  }, []);
  useEffect(() => dispatch(setError("")), [values]);

  if (isAuth) {
    return <Navigate to={location.state?.background || "/"} />;
  } else if (!sentEmail) {
    return <Navigate to={location.state?.background || "/"} />;
  }

  const handleForm = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchResetPassword({ password: values.password, token: values.code })
    );
  };

  if (msg) {
    navigate("/login");
  }

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
            htmlType="submit"
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
