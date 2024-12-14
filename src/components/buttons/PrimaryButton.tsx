import React from "react";
import styled from "styled-components";
import { StyledButton } from "@/components/buttons/Button";
import type { ButtonProps } from "@/components/buttons/Button";

const PrimaryButton: React.FC<ButtonProps> = ({
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
    <StyledPrimaryButton
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
    </StyledPrimaryButton>
  );
};

export default PrimaryButton;

const StyledPrimaryButton = styled(StyledButton)`
  border: none;
  background-color: var(--primary);
`;
