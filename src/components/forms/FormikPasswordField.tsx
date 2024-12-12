import { Field, ErrorMessage } from "formik";
import {
  ErrorWrapper,
  PasswordInputWrapper,
} from "../../styledComponents/authComponents";
import Input from "./Input";
import PasswordToggleButton from "./PasswordToggleButton";

interface FormikPasswordFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  passwordShown: boolean;
  onToggle: () => void;
}

const FormikPasswordField: React.FC<FormikPasswordFieldProps> = ({
  name,
  label,
  isRequired = false,
  passwordShown,
  onToggle,
}) => (
  <>
    <PasswordInputWrapper>
      <Field
        name={name}
        as={Input}
        label={label}
        type={passwordShown ? "text" : "password"}
        isRequired={isRequired}
      />
      <PasswordToggleButton onClick={onToggle} passwordShown={passwordShown} />
    </PasswordInputWrapper>
    <ErrorWrapper>
      <ErrorMessage name={name} />
    </ErrorWrapper>
  </>
);

export default FormikPasswordField;
