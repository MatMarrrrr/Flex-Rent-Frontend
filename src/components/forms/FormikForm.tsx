import { Formik, FormikHelpers } from "formik";
import { StyledForm } from "../../styledComponents/authComponents";
import { ReactNode } from "react";
import { Schema } from "yup";

interface FormikFormProps<T> {
  initialValues: T;
  validationSchema?: Schema<T>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  children: ReactNode;
}

const FormikForm = <T extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: FormikFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <StyledForm>{children}</StyledForm>
    </Formik>
  );
};

export default FormikForm;
