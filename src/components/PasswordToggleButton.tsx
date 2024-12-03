import React from "react";
import eye from "./../assets/icons/eye.svg";
import eyeOff from "./../assets/icons/eye-off.svg";
import styled from "styled-components";

interface PasswordToggleButtonProps {
  onClick: () => void;
  passwordShown: boolean;
}

export const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  onClick,
  passwordShown,
}) => {
  return (
    <TogleButton onClick={onClick}>
      <Icon src={passwordShown ? eyeOff : eye} />
    </TogleButton>
  );
};

const TogleButton = styled.div`
  position: absolute;
  right: 10px;
  top: 37%;
  border: none;
  padding: 3px;
  display: flex;
  border-radius: 10px;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
`;
