import { useState } from "react";
import { loginSchema } from "@/validations/loginSchema";
import {
  Wrapper,
  Container,
  Header,
  RedirectText,
  RedirectContainer,
  RedirectLink,
  ErrorText,
} from "@/styledComponents/authComponents";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikInputField from "@/components/forms/FormikInputField";
import FormikPasswordField from "@/components/forms/FormikPasswordField";
import FormikForm from "@/components/forms/FormikForm";
import { FormikCheckboxField } from "@/components/forms/FormikCheckboxField";
import { useUser } from "@/contexts/UserContext";
import { LoginData } from "@/types/interfaces";
import { useNavigate } from "react-router";
import Loader from "@/components/ui/Loader";

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePasswordVisibilityChange = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (values: LoginData) => {
    try {
      setIsSubmitting(true);
      const result = await login(values);

      if (result.success) {
        navigate("/");
      } else {
        setIsSubmitting(false);
        setAuthError(result.error || "");
      }
    } catch {
      setIsSubmitting(false);
      setAuthError("Wystąpił nieoczekiwany błąd podczas logowania.");
    }
  };

  return (
    <Wrapper>
      <Container data-aos="fade-up">
        <Header>Zaloguj się</Header>

        <FormikForm
          initialValues={{
            email: "",
            password: "",
            remember: false,
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
            margin="-10px 0px 15px 0px"
          />
          <FormikCheckboxField name="remember" label="Zapamiętaj mnie" />

          <RedirectContainer>
            <RedirectText>Nie masz konta?</RedirectText>
            <RedirectLink to="/register">Zarejestruj się</RedirectLink>
          </RedirectContainer>

          {authError && <ErrorText>{authError}</ErrorText>}

          <PrimaryButton
            type="submit"
            margin="15px 0px 0px 0px"
            disabled={isSubmitting}
          >
            Zaloguj się
            {isSubmitting && <Loader size={18} />}
          </PrimaryButton>
        </FormikForm>
      </Container>
    </Wrapper>
  );
}
