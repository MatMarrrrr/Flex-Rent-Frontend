import React from "react";
import styled from "styled-components";
import { RequiredStar } from "../../styledComponents/authComponents";

interface InputProps {
  label: string;
  type: string;
  value?: string;
  name?: string;
  isRequired?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  margin?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  name,
  isRequired = false,
  onBlur,
  onChange,
  margin,
}) => {
  return (
    <Container margin={margin}>
      <InputText>
        {isRequired && <RequiredStar>* </RequiredStar>}
        {label}
      </InputText>
      <StyledInput
        type={type}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </Container>
  );
};

export default Input;

const Container = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: ${({ margin }) => margin || "0"};
`;

const InputText = styled.p`
  font-size: 18px;
  color: var(--dark);
  width: 100%;
  margin: 0;
`;

const StyledInput = styled.input`
  border: 1px solid var(--dark-25);
  border-radius: 5px;
  height: 45px;
  font-size: 18px;
  padding: 0px 10px;
  width: 100% !important;

  &:focus {
    outline: none;
    border-color: var(--dark);
  }
`;
