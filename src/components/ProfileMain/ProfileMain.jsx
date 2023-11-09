import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./ProfileMain.module.css";
import { useForm } from "../../hooks/useForm";

function ProfileMain() {
  const { values, errors, isFormValidate, handleChange } = useForm();
  const [editInput, setEditInput] = useState({
    name: false,
    email: false,
    password: false,
  });
  const onFocusName = () => {
    setEditInput({ ...editInput, name: true });
  };
  const onFocusEmail = () => {
    setEditInput({ ...editInput, email: true });
  };
  const onFocusPassword = () => {
    setEditInput({ ...editInput, password: true });
  };
  const onBlur = () => {
    setEditInput({ name: false, email: false, password: false });
  };
  const handleForm = (evt) => {
    evt.preventDefault();
  };

  return (
    <form className={styles.form} name="profile-form" onSubmit={handleForm}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={values.name || ""}
        onFocus={onFocusName}
        onBlur={onBlur}
        icon={editInput.name ? "CloseIcon" : "EditIcon"}
        name={"name"}
        error={!!errors.name}
        errorText={errors.name}
        size={"default"}
        minLength={4}
        maxLength={15}
        required
      />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        onChange={handleChange}
        value={values.email || ""}
        onFocus={onFocusEmail}
        onBlur={onBlur}
        icon={editInput.email ? "CloseIcon" : "EditIcon"}
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
        type={"password"}
        placeholder={"Пароль"}
        onChange={handleChange}
        value={values.password || ""}
        onFocus={onFocusPassword}
        onBlur={onBlur}
        icon={editInput.password ? "CloseIcon" : "EditIcon"}
        name={"password"}
        error={!!errors.password}
        errorText={errors.password}
        size={"default"}
        extraClass={"mt-6"}
        required
        minLength={6}
        maxLength={20}
      />
      <div className={`mt-6 ${styles.buttons}`}>
        <Button
          extraClass={`${styles.button}`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Отмена
        </Button>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!isFormValidate}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default ProfileMain;
