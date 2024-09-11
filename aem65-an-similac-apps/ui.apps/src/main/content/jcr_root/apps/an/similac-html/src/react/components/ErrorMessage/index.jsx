import React from "react";
import { Field } from "react-final-form";

const ErrorMessage = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true,submitting:true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span>{error}</span> : null
    }
  </Field>
);

export default React.memo(ErrorMessage);