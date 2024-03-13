// FormContext.tsx
import React, { useContext } from "react";
import { FormikProps } from "formik";
import { PersonalInformation } from "../types/Information"; // Adjust the import path as necessary


// Remove the | undefined since we'll ensure it's always provided
const FormikContext = React.createContext<FormikProps<PersonalInformation>>(
  {} as FormikProps<PersonalInformation>
);

export function useFormikContext() {
  return useContext(FormikContext);
}

export default FormikContext;
