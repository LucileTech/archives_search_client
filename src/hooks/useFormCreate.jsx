import { useState } from "react";

const useFormCreate = (originalState) => {
  const [state, setState] = useState(originalState);

  const handleChange = (event) => {
    setState((currentState) => {
      return {
        ...currentState,

        // add a place for the pictures if the type is a file
        [event.target.name]:
          event.target.type === "file"
            ? event.target?.files?.[0]
            : event.target.value,
      };
    });
  };
  // reset the form
  const reset = () => {
    setState(originalState);
  };

  return [state, handleChange, setState, reset];
};

export default useFormCreate;
