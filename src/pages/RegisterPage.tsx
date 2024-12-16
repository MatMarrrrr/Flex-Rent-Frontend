import { useState } from "react";
import { loginSchema } from "@/validations/loginSchema";
import { personalDataSchema } from "@/validations/personalDataSchema";
import {
  loginInitialValues,
  personalDataInitialValues,
} from "@/consts/initialValues";
import {
  Wrapper,
  Container,
  Header,
  RedirectText,
  ArrowBack,
  RedirectContainer,
  RedirectLink,
} from "@/styledComponents/authComponents";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikInputField from "@/components/forms/FormikInputField";
import FormikPasswordField from "@/components/forms/FormikPasswordField";
import FormikForm from "@/components/forms/FormikForm";
import arrowBack from "@/assets/icons/arrowBack.svg";

export default function RegisterPage() {
  const [step, setStep] = useState<number>(1);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<{
    email: string;
    password: string;
  }>(loginInitialValues);

  const handlePasswordVisibilityChange = () => {
    setPasswordShown(!passwordShown);
  };

  const handleNext = (values: { email: string; password: string }) => {
    setRegisterData(values);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (values: {
    name: string;
    surname: string;
    city: string;
    province: string;
  }) => {
    const fullData = { ...registerData, ...values };
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
              validationSchema={loginSchema}
              onSubmit={handleNext}
            >
              <FormikInputField
                name="email"
                label="E-mail"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormikPasswordField
                name="password"
                label="Hasło"
                isRequired={true}
                passwordShown={passwordShown}
                onToggle={handlePasswordVisibilityChange}
              />

              <RedirectContainer>
                <RedirectText>Masz konto?</RedirectText>
                <RedirectLink to="/login">Zaloguj się</RedirectLink>
              </RedirectContainer>

              <PrimaryButton type="submit" margin="15px 0px 0px 0px">
                Dalej
              </PrimaryButton>
            </FormikForm>
          </>
        )}
        {step === 2 && (
          <>
            <ArrowBack src={arrowBack} onClick={handleBack} />
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

              <PrimaryButton type="submit" margin="15px 0px 0px 0px">
                Zarejestruj się
              </PrimaryButton>
            </FormikForm>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
