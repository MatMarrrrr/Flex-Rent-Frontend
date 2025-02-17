import React, { useState } from "react";
import styled from "styled-components";
import { X as XIcon } from "lucide-react";
import { fadeIn, fadeOut } from "@/styledComponents/keyframes";
import FormikForm from "../forms/FormikForm";
import { changePasswordInitialValues } from "@/consts/initialValues";
import { changePasswordSchema } from "@/validations/changePasswordSchema";
import Button from "../buttons/Button";
import FormikPasswordField from "../forms/FormikPasswordField";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import Loader from "../ui/Loader";
import { is } from "date-fns/locale";

interface ChangePasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface PasswordsVisibility {
  oldPassword: boolean;
  newPassword: boolean;
  repeatPassword: boolean;
}

interface ChangePasswordFormValues {
  old_password: string;
  new_password: string;
  repeat_password: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [isClosing, setisClosing] = useState<boolean>(false);
  const [passwordsVisibility, setPasswordsVisibility] =
    useState<PasswordsVisibility>({
      oldPassword: false,
      newPassword: false,
      repeatPassword: false,
    });
  const [passwordChangeError, setPasswordChangeError] = useState<string>("");
  const [isSumitting, setIsSubmitting] = useState<boolean>(false);
  const { notify } = useToast();
  const { token } = useUser();

  const handleClose = () => {
    setisClosing(true);
    setTimeout(() => {
      onClose();
      setisClosing(false);
    }, 300);
  };

  const handlePasswordVisibilityChange = (field: keyof PasswordsVisibility) => {
    setPasswordsVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = async (values: ChangePasswordFormValues) => {
    setPasswordChangeError("");
    setIsSubmitting(true);
    try {
      await apiClient.patch("/user/password", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("Hasło zostało poprawnie zmienione", "success");
      handleClose();
    } catch (error: any) {
      notify("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.", "error");
      setPasswordChangeError(error?.response?.data?.message || "Wystąpił błąd");
    }
    setIsSubmitting(false);
  };

  if (!isVisible && !isClosing) return null;

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent>
        <CloseButton onClick={handleClose} />
        <ModalTitle>Zmień hasło</ModalTitle>
        <FormikForm
          initialValues={changePasswordInitialValues}
          onSubmit={handlePasswordChange}
          validationSchema={changePasswordSchema}
        >
          <FormikPasswordField
            name="old_password"
            label="Stare hasło"
            isRequired={true}
            passwordShown={passwordsVisibility.oldPassword}
            onToggle={() => handlePasswordVisibilityChange("oldPassword")}
            margin="-10px 0px 15px 0px"
          />
          <FormikPasswordField
            name="new_password"
            label="Nowe hasło"
            isRequired={true}
            passwordShown={passwordsVisibility.newPassword}
            onToggle={() => handlePasswordVisibilityChange("newPassword")}
            margin="-10px 0px 15px 0px"
          />
          <FormikPasswordField
            name="repeat_password"
            label="Powtórz nowe hasło"
            isRequired={true}
            passwordShown={passwordsVisibility.repeatPassword}
            onToggle={() => handlePasswordVisibilityChange("repeatPassword")}
            margin="-10px 0px 15px 0px"
          />
          {passwordChangeError && (
            <>
              <Divider />
              <PasswordChangeErrorMessage>
                {passwordChangeError}
              </PasswordChangeErrorMessage>
            </>
          )}

          <Button type="submit" disabled={isSumitting}>
            {isSumitting ? (
              <>
                Zmieniane <Loader size={18} />
              </>
            ) : (
              "Zmień hasło"
            )}
          </Button>
        </FormikForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChangePasswordModal;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  padding: 40px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  position: relative;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;

  @media (max-width: 700px) {
    margin: 0 10px;
  }
`;

const ModalTitle = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--dark);
`;

const CloseButton = styled(XIcon)`
  height: 35px;
  width: 35px;
  color: var(--dark);
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PasswordChangeErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  margin-top: -10px;
  color: var(--error);
  font-weight: bold;
  font-size: 16px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 3px;
  background-color: var(--dark);
  margin: 20px 0;
`;
