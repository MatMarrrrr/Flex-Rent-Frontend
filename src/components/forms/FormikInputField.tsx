import { Field, ErrorMessage } from "formik";
import { ErrorWrapper } from "../../styledComponents/authComponents";
import Input from "./Input";
import styled from "styled-components";

interface FormikInputFieldProps {
  name: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  margin?: string;
}

const FormikInputField: React.FC<FormikInputFieldProps> = ({
  name,
  label,
  type = "text",
  isRequired = false,
  margin,
}) => (
  <FieldWrapper>
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
  </FieldWrapper>
);

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FormikInputField;
