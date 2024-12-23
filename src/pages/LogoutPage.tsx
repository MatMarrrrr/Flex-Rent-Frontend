import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function LogoutPage() {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/");
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <LogoutLoader>
      <LoaderText>Wylogowywanie...</LoaderText>
    </LogoutLoader>
  );
}

const LogoutLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f8fc;
`;

const LoaderText = styled.div`
  font-size: 3vh;
  color: #3498db;
  font-family: "Exo 2", sans-serif;
  transition: transform 0.5s ease-in-out;
  animation: pulse 1.5s infinite linear;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
