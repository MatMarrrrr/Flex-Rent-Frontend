import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  margin?: string;
  maxWidth?: string;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type,
  margin,
  maxWidth,
  children,
}) => {
  return (
    <StyledButton
      margin={margin}
      onClick={onClick}
      type={type}
      disabled={disabled}
      maxWidth={maxWidth}
    >
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;

const StyledButton = styled.button<{
  disabled?: boolean;
  margin?: string;
  maxWidth?: string;
}>`
  border: none;
  border-radius: 50px;
  background-color: var(--primary);
  max-width: 400px;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: var(--dark);
  padding: 16px 0px;
  margin: ${({ margin }) => margin || "0"};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:disabled:hover {
    transform: none;
  }

  @media (max-width: 1230px) {
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "none")};
  }
`;
