import { Field, ErrorMessage } from "formik";
import { ErrorWrapper } from "@/styledComponents/authComponents";
import styled from "styled-components";
import TextArea from "@/components/forms/TextArea";

interface FormikTextAreaFieldProps {
  name: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  margin?: string;
}

const FormikTextAreaField: React.FC<FormikTextAreaFieldProps> = ({
  name,
  label,
  type = "text",
  isRequired = false,
  margin,
}) => (
  <FieldWrapper>
    <Field
      name={name}
      as={TextArea}
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

export default FormikTextAreaField;
