import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useState,
  useEffect,
  useMemo,
  useRef,
  FormEvent,
  MutableRefObject,
  FC,
} from "react";
import styles from "./ProfileMain.module.css";
import { useForm } from "../../hooks/useForm";
import { fetchChangeUserInfo } from "../../services/thunk/authenticationQuery";
import {
  formPending,
  user,
} from "../../services/selector/authenticationSelector";
import { checkUserAuth } from "../../utils/authCheck";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import { TErrors, TValues } from "../../utils/types/useFormTypes";

const ProfileMain: FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(user) as { name: string; email: string };
  const pendingForm = useAppSelector(formPending) as boolean;
  const nameRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const {
    values,
    errors,
    isFormValidate,
    handleChange,
    handleReset,
    setValues,
  } = useForm();
  const [editInput, setEditInput] = useState({
    name: true,
    email: true,
    password: true,
  });
  const newValues =
    userInfo?.name !== values.name ||
    values.password.length >= 6 ||
    userInfo?.email !== values.email;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    userInfo &&
      handleReset({ name: userInfo.name, email: userInfo.email, password: "" });
  }, []);

  const disableButton = useMemo(
    () => isFormValidate && newValues,
    [isFormValidate, userInfo?.name, values, userInfo?.email]
  );

  const onFocusName = () => {
    setEditInput({ ...editInput, name: false });
    nameRef.current?.focus();
  };
  const onFocusEmail = () => {
    setEditInput({ ...editInput, email: false });
    emailRef.current?.focus();
  };
  const onFocusPassword = () => {
    setEditInput({ ...editInput, password: false });
    passwordRef.current?.focus();
  };
  const onBlur = () => {
    setEditInput({ name: true, email: true, password: true });
    if (values.password.length < 6) {
      setValues({ ...values, password: "" });
    }
  };
  const handleForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (values.password.length < 6) {
      dispatch(fetchChangeUserInfo({ name: values.name, email: values.email }));
    } else {
      dispatch(
        fetchChangeUserInfo({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    }
  };

  const resetForm = () => {
    handleReset({ name: userInfo?.name, email: userInfo?.email, password: "" });
  };

  return (
    <section className={`${styles.container}`}>
      <form className={styles.form} name="profile-form" onSubmit={handleForm}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name || ""}
          onIconClick={onFocusName}
          onBlur={onBlur}
          icon={!editInput.name ? "CloseIcon" : "EditIcon"}
          name={"name"}
          error={false}
          errorText={errors.name}
          size={"default"}
          minLength={4}
          maxLength={15}
          ref={nameRef}
          readOnly={editInput.name}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email || ""}
          onIconClick={onFocusEmail}
          onBlur={onBlur}
          icon={!editInput.email ? "CloseIcon" : "EditIcon"}
          name={"email"}
          error={false}
          errorText={errors.email}
          size={"default"}
          extraClass="mt-6"
          minLength={8}
          maxLength={25}
          ref={emailRef}
          readOnly={editInput.email}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChange}
          value={values.password || ""}
          onIconClick={onFocusPassword}
          onBlur={onBlur}
          icon={!editInput.password ? "CloseIcon" : "EditIcon"}
          name={"password"}
          error={false}
          errorText={errors.password}
          size={"default"}
          extraClass={"mt-6"}
          minLength={6}
          ref={passwordRef}
          readOnly={editInput.password}
        />
        {newValues && (
          <div className={`mt-6 ${styles.buttons}`}>
            <Button
              extraClass={`${styles.button}`}
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={
                !disableButton ||
                pendingForm ||
                !values.email ||
                values.name.length < 4
              }
            >
              {pendingForm ? "Сохранение" : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ProfileMain;
