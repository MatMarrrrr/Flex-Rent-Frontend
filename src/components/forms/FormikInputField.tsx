import { Field, ErrorMessage } from "formik";
import { ErrorWrapper } from "@/styledComponents/authComponents";
import Input from "@/components/forms/Input";
import styled from "styled-components";

interface FormikInputFieldProps {
  name: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  disabled?: boolean;
  margin?: string;
  padding? :string;
}

const FormikInputField: React.FC<FormikInputFieldProps> = ({
  name,
  label,
  type = "text",
  isRequired = false,
  disabled = false,
  margin,
  padding,
}) => (
  <FieldWrapper>
    <Field
      name={name}
      as={Input}
      label={label}
      type={type}
      isRequired={isRequired}
      disabled={disabled}
      margin={margin}
      padding={padding}
    />
    <ErrorWrapper>
      <ErrorMessage name={name} />
    </ErrorWrapper>
  </FieldWrapper>
);

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FormikInputField;
