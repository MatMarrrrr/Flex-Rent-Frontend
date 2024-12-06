import { Field, ErrorMessage } from "formik";
import { ErrorWrapper } from "../../styledComponents/authComponents";
import Input from "./Input";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  margin?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  isRequired = false,
  margin,
}) => (
  <>
    <Field
      name={name}
      as={Input}
      label={label}
      type={type}
      isRequired={isRequired}
      margin={margin}
    />
    <ErrorWrapper>
      <ErrorMessage name={name} />
    </ErrorWrapper>
  </>
);

export default FormField;
