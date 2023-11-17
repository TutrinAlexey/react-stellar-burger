import { useState, useCallback, ChangeEvent } from "react";
import { TErrors, TValues } from "../utils/types/useFormTypes";

export const useForm = (
  inputValues:TValues = { name: "", password: "", email: "", code: "" },
  inputErrors:TErrors = { name: "", password: "", email: "", code: "" }
) => {
  const [values, setValues] = useState<TValues>(inputValues);
  const [errors, setErrors] = useState<TErrors>(inputErrors);
  const [isFormValidate, setValidate] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement & HTMLFormElement>
  ) => {
    const { value, name, validationMessage, closest } = event.target;
    const form: HTMLFormElement | null = event.target.closest("form");
    setValidate(form!.checkValidity());
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
  };

  const handleReset = useCallback(
    (values = {}, errors = {}, isFormValid = {}) => {
      setValues(values);
      setErrors(errors);
      setValidate(isFormValid);
    },
    [setValues, setErrors, setValidate]
  );
  return {
    values,
    errors,
    setValues,
    setValidate,
    handleChange,
    setErrors,
    isFormValidate,
    handleReset,
  };
};
