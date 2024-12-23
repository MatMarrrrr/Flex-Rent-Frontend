import { Form } from "formik";
import { Link } from "react-router";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 308px);

  @media (max-width: 700px) {
    background: var(--white);
  }
`;

export const Container = styled.div`
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

  @media (max-width: 700px) {
    box-shadow: none;
    border-radius: 0px;
  }
`;

export const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

export const RedirectContainer = styled.div`
  max-width: 400px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 5px;
`;

export const RedirectLink = styled(Link)`
  color: var(--blue);
  font-size: 16px;
  text-decoration: none;
  transition: transform 0.3s ease;
  font-weight: bold;
  color: var(--dark);

  &:hover {
    text-decoration: underline;
  }
`;

export const RedirectText = styled.p`
  color: var(--blue);
  font-size: 16px;
  font-weight: bold;
`;

export const PasswordInputWrapper = styled.div<{ $margin?: string }>`
  width: 100%;
  display: flex;
  margin: ${({ $margin }) => $margin || "0"};
  justify-content: center;
  position: relative;
`;

export const ErrorWrapper = styled.div`
  margin-bottom: 15px;
  color: var(--error);
  font-size: 16px;
  font-weight: bold;
`;

export const ErrorText = styled.p`
  margin-bottom: 15px;
  color: var(--error);
  font-size: 16px;
  font-weight: bold;
  max-width: 400px;
  overflow-wrap: break-word;
  text-align: center;
`;

export const RequiredStar = styled.span`
  color: var(--error);
`;

export const ArrowBack = styled(ArrowBackIcon)<{ $disabled: boolean }>`
  position: absolute;
  top: 41px;
  left: 30px;
  height: 30px;
  width: 30px;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  stroke-width: 1.5;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
