import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const { setIsLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(false);
    navigate("/login");
  }, [setIsLogin, navigate]);

  return null;
}
