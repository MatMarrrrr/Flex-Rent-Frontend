import React from "react";
import styled from "styled-components";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";

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
      {passwordShown ? <EyeOff /> : <Eye />}
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

const Eye = styled(EyeIcon)`
  height: 25px;
  width: 25px;
`;

const EyeOff = styled(EyeOffIcon)`
  height: 25px;
  width: 25px;
`;
