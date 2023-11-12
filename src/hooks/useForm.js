import { useState, useCallback } from "react";

export const useForm = (inputValues = {}, inputErrors = {}) => {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState(inputErrors);
  const [isFormValidate, setValidate] = useState(false);

  const handleChange = (event) => {
    const { value, name, validationMessage, closest } = event.target;
    const form = event.target.closest("form");
    setValidate(form.checkValidity());
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
  };

  const handleReset = useCallback(
    (values = {}, errors = {}, isFormValid = {}) => {
      setValues(values);
      setErrors(errors);
      setValidate(isFormValid);
    }
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
