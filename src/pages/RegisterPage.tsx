import { useState } from "react";
import { loginSchema } from "../validations/loginSchema";
import { personalDataSchema } from "../validations/personalDataSchema";
import {
  loginInitialValues,
  personalDataInitialValues,
} from "../consts/initialValues";
import {
  Wrapper,
  Container,
  Header,
  RedirectText,
  ArrowBack,
} from "../styledComponents/authComponents";
import PrimaryButton from "../components/buttons/PrimaryButton";
import FormField from "../components/forms/FormField";
import PasswordField from "../components/forms/PasswordField";
import FormikForm from "../components/forms/FormikForm";
import arrowBack from "../assets/icons/arrow_back.svg";

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
              <FormField
                name="email"
                label="E-mail"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <PasswordField
                name="password"
                label="Hasło"
                isRequired={true}
                passwordShown={passwordShown}
                onToggle={handlePasswordVisibilityChange}
              />

              <RedirectText to="/login">Masz konto? Zaloguj się</RedirectText>

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
              <FormField
                name="name"
                label="Imie"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormField
                name="surname"
                label="Nazwisko"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormField
                name="city"
                label="Miasto"
                type="text"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <FormField
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
