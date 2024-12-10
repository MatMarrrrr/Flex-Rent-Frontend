import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  margin?: string;
  fontSize?: string;
  fontColor?: string;
  borderColor?: string;
  background?: string;
  desktopMaxWidth?: string;
  mobileMaxWidth?: string;
  mobileStart?: number;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type = "button",
  margin,
  fontSize,
  fontColor,
  borderColor,
  background,
  desktopMaxWidth,
  mobileMaxWidth,
  mobileStart,
  children,
}) => {
  return (
    <StyledButton
      $margin={margin}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $borderColor={borderColor}
      $background={background}
      onClick={onClick}
      type={type}
      disabled={disabled}
      $desktopMaxWidth={desktopMaxWidth}
      $mobileMaxWidth={mobileMaxWidth}
      $mobileStart={mobileStart}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

export const StyledButton = styled.button<{
  disabled?: boolean;
  $margin?: string;
  $fontSize?: string;
  $fontColor?: string;
  $borderColor?: string;
  $background?: string;
  $desktopMaxWidth?: string;
  $mobileMaxWidth?: string;
  $mobileStart?: number;
}>`
  border: 2px solid ${({ $borderColor }) => $borderColor || "var(--dark)"};
  border-radius: 50px;
  background: ${({ $background }) => $background || "var(--white)"};
  max-width: ${({ $desktopMaxWidth }) => $desktopMaxWidth || "none"};
  width: 100%;
  font-size: ${({ $fontSize }) => $fontSize || "18px"};
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin: ${({ $margin }) => $margin || "0"};
  color: ${({ $fontColor }) => $fontColor || "var(--dark)"};
  padding: 16px 0px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.7;
  }

  &:disabled:hover {
    transform: none;
  }

  ${({ $mobileStart, $mobileMaxWidth }) =>
    $mobileStart &&
    `
    @media (max-width: ${$mobileStart}px) {
      max-width: ${$mobileMaxWidth || "none"};
    }
  `}
`;
