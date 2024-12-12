import { Field, ErrorMessage } from "formik";
import { ErrorWrapper } from "../../styledComponents/authComponents";
import Select from "./Select";

interface FormikSelectFieldProps {
  name: string;
  label: string;
  defaultValue: string;
  isRequired?: boolean;
  margin?: string;
  options: { value: string; label: string }[];
}

const FormikSelectField: React.FC<FormikSelectFieldProps> = ({
  name,
  label,
  defaultValue,
  isRequired = false,
  margin,
  options,
}) => (
  <>
    <Field
      name={name}
      as={Select}
      label={label}
      defaultValue={defaultValue}
      isRequired={isRequired}
      margin={margin}
      options={options}
    />
    <ErrorWrapper>
      <ErrorMessage name={name} />
    </ErrorWrapper>
  </>
);

export default FormikSelectField;
