import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Loader from "@/components/ui/Loader";

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
      <Loader size={50} />
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
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: #f3f8fc;
`;

const LoaderText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: var(--dark);
  text-align: center;
`;
