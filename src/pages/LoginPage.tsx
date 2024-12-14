import { useState } from "react";
import { loginSchema } from "@/validations/loginSchema";
import {
  Wrapper,
  Container,
  Header,
  RedirectText,
} from "@/styledComponents/authComponents";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikInputField from "@/components/forms/FormikInputField";
import FormikPasswordField from "@/components/forms/FormikPasswordField";
import FormikForm from "@/components/forms/FormikForm";

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const handlePasswordVisibilityChange = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Dane formularza:", values);
  };

  return (
    <Wrapper>
      <Container data-aos="fade-up">
        <Header>Zaloguj się</Header>

        <FormikForm
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
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

          <RedirectText to="/register">
            Nie masz konta? Zarejestruj się
          </RedirectText>

          <PrimaryButton type="submit" margin="15px 0px 0px 0px">
            Zaloguj się
          </PrimaryButton>
        </FormikForm>
      </Container>
    </Wrapper>
  );
}
