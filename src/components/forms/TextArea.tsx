import React from "react";
import styled from "styled-components";
import { RequiredStar } from "../../styledComponents/authComponents";

interface TextAreaProps {
  label: string;
  value?: string;
  name?: string;
  isRequired?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  margin?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  name,
  isRequired = false,
  onBlur,
  onChange,
  margin,
}) => {
  return (
    <Container $margin={margin}>
      <InputText>
        {isRequired && <RequiredStar>* </RequiredStar>}
        {label}
      </InputText>
      <StyledTextArea
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </Container>
  );
};

export default TextArea;

const Container = styled.div<{ $margin?: string }>`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: ${({ $margin }) => $margin || "0"};
`;

const InputText = styled.p`
  font-size: 18px;
  color: var(--dark);
  width: 100%;
  margin: 0;
`;

const StyledTextArea = styled.textarea`
  border: 1px solid var(--dark-25);
  border-radius: 5px;
  min-height: 100px;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--dark);
  }
`;
