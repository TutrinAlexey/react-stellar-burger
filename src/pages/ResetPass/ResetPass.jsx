import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPass.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { isLogin } from "../../services/selector/authenticationSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../../services/thunk/authenticationQuery";

function ResetPass() {
  const navigate = useNavigate();
  const isAuth = useSelector(isLogin);
  const location = useLocation();
  const { values, errors, isFormValidate, handleChange } = useForm();
  const dispatch = useDispatch();

  const handleForm = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchResetPassword({ password: values.password, token: values.code })
    );
    navigate("/login");
  };
  const [hiddenPass, setHiddenPass] = useState(false);
  const onIconClick = () => {
    setHiddenPass(!hiddenPass);
  };

  if (isAuth) {
    return <Navigate to={location.state?.background || "/"} />;
  }

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
            disabled={!isFormValidate}
          >
            Восстановить
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
