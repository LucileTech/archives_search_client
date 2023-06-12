import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues({
      ...values,
      // if the type of the input is a checkbox, we check if the checkbox is checked so it become a boolean
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  // reset the form
  const reset = () => {
    setValues(initialValues);
  };
  return [values, handleChange, reset];
};

export default useForm;
