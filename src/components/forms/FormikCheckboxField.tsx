import { Field } from "formik";
import styled from "styled-components";

interface FormikCheckboxFieldProps {
  name: string;
  label: string;
}

export const FormikCheckboxField: React.FC<FormikCheckboxFieldProps> = ({
  name,
  label,
}) => {
  return (
    <CheckboxWrapper>
      <Field type="checkbox" id={name} name={name} />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const StyledLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;
