import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  margin?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type,
  margin,
  children,
}) => {
  return (
    <StyledButton
      $margin={margin}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ disabled?: boolean; $margin?: string }>`
  border: 2px solid var(--dark);
  border-radius: 50px;
  background-color: var(--white);
  max-width: 400px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin: ${({ $margin }) => $margin || "0"};
  color: var(--dark);
  padding: 16px 0px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.7;
  }
`;
