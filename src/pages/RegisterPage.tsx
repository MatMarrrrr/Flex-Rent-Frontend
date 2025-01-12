import { useState } from "react";
import { personalDataSchema } from "@/validations/personalDataSchema";
import {
  RegisterAuthValues,
  RegisterPersonalDataValues,
} from "@/types/interfaces";
import {
  personalDataInitialValues,
  registerInitialValues,
} from "@/consts/initialValues";
import {
  Wrapper,
  Container,
  Header,
  RedirectText,
  ArrowBack,
  RedirectContainer,
  RedirectLink,
  ErrorText,
} from "@/styledComponents/authComponents";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikInputField from "@/components/forms/FormikInputField";
import FormikPasswordField from "@/components/forms/FormikPasswordField";
import FormikForm from "@/components/forms/FormikForm";
import { registerSchema } from "@/validations/registerSchema";
import Loader from "@/components/ui/Loader";
import { useNavigate } from "react-router";
import { useUser } from "@/contexts/UserContext";
import apiClient from "@/utils/apiClient";
import HttpStatusCodes from "@/consts/httpStatusCodes";

export default function RegisterPage() {
  const { register } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [repeatPasswordShown, setRepeatPasswordShown] =
    useState<boolean>(false);
  const [registerData, setRegisterData] = useState<RegisterAuthValues>(
    registerInitialValues
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEmailChecking, setIdEmailChecking] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const handlePasswordVisibilityChange = () => {
    setPasswordShown(!passwordShown);
  };

  const handleRepeatPasswordVisibilityChange = () => {
    setRepeatPasswordShown(!repeatPasswordShown);
  };

  const checkEmail = async (email: string) => {
    try {
      await apiClient.head(`/check-email/${email}`);
      return true;
    } catch (error: any) {
      if (error.response?.status === HttpStatusCodes.NOT_FOUND) {
        return false;
      }
      console.error("Błąd podczas sprawdzania emaila:", error);
      return false;
    }
  };

  const handleNext = async (values: RegisterAuthValues) => {
    setIsEmailError(false);
    setIdEmailChecking(true);

    const emailExists = await checkEmail(values.email);

    if (!emailExists) {
      setIsEmailError(false);
      setRegisterData(values);
      setIdEmailChecking(false);
      setStep(2);
    } else {
      setIsEmailError(true);
      setIdEmailChecking(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (values: RegisterPersonalDataValues) => {
    const fullData = { ...registerData, ...values };
    try {
      setIsSubmitting(true);
      const result = await register(fullData);
      console.log(result);
      if (result.success) {
        navigate("/");
      } else {
        setIsSubmitting(false);
        setAuthError(result.error || "");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      setAuthError("Wystąpił nieoczekiwany błąd podczas rejestracji.");
    }
    console.log(fullData);
  };

  return (
    <Wrapper>
      <Container data-aos="fade-up">
        {step === 1 && (
          <>
            <Header>Zarejestruj się</Header>
            <FormikForm
              initialValues={registerData}
              validationSchema={registerSchema}
              onSubmit={handleNext}
            >
              <FormikInputField
                name="email"
                label="E-mail"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
                disabled={isEmailChecking}
              />
              <FormikPasswordField
                name="password"
                label="Hasło"
                isRequired={true}
                passwordShown={passwordShown}
                onToggle={handlePasswordVisibilityChange}
                margin="-10px 0px 15px 0px"
                padding="0px 40px 0px 10px"
                disabled={isEmailChecking}
              />
              <FormikPasswordField
                name="repeatPassword"
                label="Powtórzone hasło"
                isRequired={true}
                passwordShown={repeatPasswordShown}
                onToggle={handleRepeatPasswordVisibilityChange}
                margin="0px 0px 15px 0px"
                padding="0px 40px 0px 10px"
                disabled={isEmailChecking}
              />

              <RedirectContainer>
                <RedirectText>Masz konto?</RedirectText>
                <RedirectLink to="/login">Zaloguj się</RedirectLink>
              </RedirectContainer>

              {isEmailError && (
                <ErrorText>Podany email jest już zajęty</ErrorText>
              )}

              <PrimaryButton
                type="submit"
                margin="15px 0px 0px 0px"
                disabled={isEmailChecking}
              >
                Dalej
                {isEmailChecking && <Loader size={18} />}
              </PrimaryButton>
            </FormikForm>
          </>
        )}
        {step === 2 && (
          <>
            <ArrowBack onClick={handleBack} $disabled={isSubmitting} />
            <Header>Podaj swoje dane</Header>
            <FormikForm
              initialValues={personalDataInitialValues}
              validationSchema={personalDataSchema}
              onSubmit={handleSubmit}
            >
              <FormikInputField
                name="name"
                label="Imie"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormikInputField
                name="surname"
                label="Nazwisko"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormikInputField
                name="city"
                label="Miasto"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormikInputField
                name="province"
                label="Województwo"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />

              {authError && <ErrorText>{authError}</ErrorText>}

              <PrimaryButton
                type="submit"
                margin="15px 0px 0px 0px"
                disabled={isSubmitting}
              >
                Zarejestruj się
                {isSubmitting && <Loader size={18} />}
              </PrimaryButton>
            </FormikForm>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
