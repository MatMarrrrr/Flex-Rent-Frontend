import { Field, ErrorMessage } from "formik";
import {
  ErrorWrapper,
  PasswordInputWrapper,
} from "@/styledComponents/authComponents";
import Input from "@/components/forms/Input";
import PasswordToggleButton from "@/components/buttons/PasswordToggleButton";

interface FormikPasswordFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  passwordShown: boolean;
  margin: string;
  padding?: string;
  disabled?: boolean;
  onToggle: () => void;
}

const FormikPasswordField: React.FC<FormikPasswordFieldProps> = ({
  name,
  label,
  isRequired = false,
  passwordShown,
  margin,
  padding,
  disabled,
  onToggle,
}) => (
  <>
    <PasswordInputWrapper $margin={margin}>
      <Field
        name={name}
        as={Input}
        label={label}
        type={passwordShown ? "text" : "password"}
        isRequired={isRequired}
        padding={padding}
        disabled={disabled}
      />
      <PasswordToggleButton onClick={onToggle} passwordShown={passwordShown} />
    </PasswordInputWrapper>
    <ErrorWrapper>
      <ErrorMessage name={name} />
    </ErrorWrapper>
  </>
);

export default FormikPasswordField;
