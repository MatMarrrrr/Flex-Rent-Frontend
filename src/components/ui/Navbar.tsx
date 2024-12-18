import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Bell as BellIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import HamburgerButton from "@/components/ui/HamburgerButton";
import Logo from "@/components/ui/Logo";
import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
  const { isLogin, setIsLogin } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  const toggleMobileNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Container>
        <Logo />
        {/* Temporary */}
        <IsLoginCheckboxContainer>
          <IsLoginText>Log:</IsLoginText>
          <IsLoginCheckbox
            type="checkbox"
            checked={isLogin}
            onChange={(e) => setIsLogin(e.target.checked)}
          />
        </IsLoginCheckboxContainer>
        <Links>
          {isLogin ? (
            <>
              <LinkWrapper>
                <StyledBellIcon $isActive={isActivePath("/dashboard")} />
                <StyledLink
                  $isActive={isActivePath("/dashboard")}
                  to="/dashboard"
                >
                  Dashboard
                </StyledLink>
              </LinkWrapper>
              <LinkWrapper>
                <StyledUserIcon $isActive={isActivePath("/profile")} />
                <StyledLink $isActive={isActivePath("/profile")} to="/profile">
                  Profile
                </StyledLink>
              </LinkWrapper>
              <LinkWrapper>
                <StyledLogoutIcon />
                <StyledLink to="/logout">Logout</StyledLink>
              </LinkWrapper>
            </>
          ) : (
            <>
              <StyledLink $isActive={isActivePath("/login")} to="/login">
                Zaloguj się
              </StyledLink>
              <StyledLink $isActive={isActivePath("/register")} to="/register">
                Zarejestruj się
              </StyledLink>
            </>
          )}
        </Links>
      </Container>
      <HamburgerButton
        isOpen={isOpen}
        toggleMobileNavbar={toggleMobileNavbar}
      />
      <MobileNavbarContainer $isOpen={isOpen}>
        {isLogin ? (
          <>
            <LinkWrapper>
              <StyledBellIcon $isActive={isActivePath("/dashboard")} />
              <StyledLink
                $isActive={isActivePath("/dashboard")}
                to="/dashboard"
              >
                Dashboard
              </StyledLink>
            </LinkWrapper>
            <LinkWrapper>
              <StyledUserIcon $isActive={isActivePath("/profile")} />
              <StyledLink $isActive={isActivePath("/profile")} to="/profile">
                Profile
              </StyledLink>
            </LinkWrapper>
            <LinkWrapper>
              <StyledLogoutIcon />
              <StyledLink to="/logout">Logout</StyledLink>
            </LinkWrapper>
          </>
        ) : (
          <>
            <StyledLink $isActive={isActivePath("/register")} to="/register">
              Zarejestruj się
            </StyledLink>
            <StyledLink $isActive={isActivePath("/login")} to="/login">
              Zaloguj się
            </StyledLink>
          </>
        )}
        {/* Temporary */}
        <MobileIsLoginCheckboxContainer>
          <IsLoginText>Log:</IsLoginText>
          <IsLoginCheckbox
            type="checkbox"
            checked={isLogin}
            onChange={(e) => setIsLogin(e.target.checked)}
          />
        </MobileIsLoginCheckboxContainer>
      </MobileNavbarContainer>
    </>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  background: var(--gradient);
  z-index: 100;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--white);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const StyledBellIcon = styled(BellIcon)<{ $isActive: boolean }>`
  color: var(--white);
  stroke-width: ${({ $isActive }) => ($isActive ? 2.5 : 1.5)};
  width: 24px;
  height: 24px;
`;

const StyledUserIcon = styled(UserIcon)<{ $isActive: boolean }>`
  color: var(--white);
  stroke-width: ${({ $isActive }) => ($isActive ? 2.5 : 1.5)};
  width: 24px;
  height: 24px;
`;

const StyledLogoutIcon = styled(LogOutIcon)`
  color: var(--white);
  width: 24px;
  height: 24px;
`;

const StyledLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  font-size: 20px;
  color: var(--light);
  transition: transform 0.3s ease;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--white);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileNavbarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background: var(--dark);
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  display: none;
  flex-direction: column;
  padding: 80px 40px;
  gap: 20px;
  z-index: 101;

  @media (max-width: 800px) {
    display: flex;
  }
`;

/* Temporary isLogin Checkbox */

const IsLoginCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const MobileIsLoginCheckboxContainer = styled(IsLoginCheckboxContainer)`
  display: none;
  @media (max-width: 800px) {
    display: flex;
  }
`;

const IsLoginCheckbox = styled.input`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const IsLoginText = styled.p`
  font-size: 16px;
  color: var(--light);
  margin: 0;
`;
