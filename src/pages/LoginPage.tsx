import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { loginSchema } from "../validations/loginSchema";
import { PasswordToggleButton } from "../components/PasswordToggleButton";

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
      <Container>
        <Header>Zaloguj się</Header>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <Field
              name="email"
              as={Input}
              label="E-mail"
              type="text"
              margin="0px 0px 15px 0px"
            />
            <ErrorWrapper>
              <ErrorMessage name="email" />
            </ErrorWrapper>
            <PasswordInputWrapper>
              <Field
                name="password"
                as={Input}
                label="Hasło"
                type={passwordShown ? "text" : "password"}
                margin="0px 0px 15px 0px"
              />
              <PasswordToggleButton
                onClick={handlePasswordVisibilityChange}
                passwordShown={passwordShown}
              />
            </PasswordInputWrapper>
            <ErrorWrapper>
              <ErrorMessage name="password" />
            </ErrorWrapper>

            <RedirectText to="/register">
              Nie masz konta? Zarejestruj się
            </RedirectText>

            <PrimaryButton type="submit" margin="15px 0px 0px 0px">
              Zaloguj się
            </PrimaryButton>
          </StyledForm>
        </Formik>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 308px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
  max-width: 540px;
  border-radius: 30px;
  background-color: var(--white);
  box-shadow: var(--shadow);
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

const RedirectText = styled(Link)`
  color: var(--blue);
  font-size: 16px;
  text-decoration: none;
  text-align: left;
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s ease;
  font-size: 16px;
  font-weight: bold;
  color: var(--dark);

  &:hover {
    text-decoration: underline;
  }
`;

const PasswordInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ErrorWrapper = styled.div`
  margin-bottom: 15px;
  color: var(--error);
  font-size: 16px;
  font-weight: bold;
`;
