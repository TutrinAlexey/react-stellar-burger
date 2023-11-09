import {
  Input,
  Button,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import { useState } from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";

function Profile() {
  const [value, setValue] = useState("value");
  const [editInput, setEditInput] = useState(false);
  const onFocus = () => {
    setEditInput(true);
  };
  const onBlur = () => {
    setEditInput(false);
  };
  const handleForm = (evt) => {
    evt.preventDefault();
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ProfileNavigation explanation={"В этом разделе вы можете изменить свои персональные данные"} />
        <form className={styles.form} name="profile-form" onSubmit={handleForm}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValue(e.target.value)}
            value={""}
            onFocus={onFocus}
            onBlur={onBlur}
            icon={editInput ? "CloseIcon" : "EditIcon"}
            name={"Name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            minLength={4}
            maxLength={15}
            required
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={""}
            onFocus={onFocus}
            onBlur={onBlur}
            icon={editInput ? "CloseIcon" : "EditIcon"}
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
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setValue(e.target.value)}
            value={""}
            onFocus={onFocus}
            onBlur={onBlur}
            icon={editInput ? "CloseIcon" : "EditIcon"}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
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
            <Button htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
