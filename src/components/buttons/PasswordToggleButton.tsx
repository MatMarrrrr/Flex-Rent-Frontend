import React from "react";
import eye from "./../../assets/icons/eye.svg";
import eyeOff from "./../../assets/icons/eye_off.svg";
import styled from "styled-components";

interface PasswordToggleButtonProps {
  onClick: () => void;
  passwordShown: boolean;
}

const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  onClick,
  passwordShown,
}) => {
  return (
    <TogleButton onClick={onClick}>
      <Icon src={passwordShown ? eyeOff : eye} />
    </TogleButton>
  );
};

export default PasswordToggleButton;

const TogleButton = styled.div`
  position: absolute;
  right: 10px;
  top: 45%;
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
