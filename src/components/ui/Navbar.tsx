import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import dashboardIcon from "@/assets/icons/bell.svg";
import profileIcon from "@/assets/icons/profile.svg";
import HamburgerButton from "@/components/ui/HamburgerButton";
import Logo from "@/components/ui/Logo";
import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
  const { isLogin, setIsLogin } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
                <LinkIcon src={dashboardIcon} />
                <StyledLink to="/dashboard">Dashboard</StyledLink>
              </LinkWrapper>
              <LinkWrapper>
                <LinkIcon src={profileIcon} />
                <StyledLink to="/profil">Profil</StyledLink>
              </LinkWrapper>
            </>
          ) : (
            <>
              <StyledLink to="/login">Zaloguj się</StyledLink>
              <BoldLink to="/register">Zarejestruj się</BoldLink>
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
              <LinkIcon src={dashboardIcon} />
              <StyledLink to="/dashboard">Dashboard</StyledLink>
            </LinkWrapper>
            <LinkWrapper>
              <LinkIcon src={profileIcon} />
              <StyledLink to="/profil">Profil</StyledLink>
            </LinkWrapper>
          </>
        ) : (
          <>
            <BoldLink to="/register">Zarejestruj się</BoldLink>
            <StyledLink to="/login">Zaloguj się</StyledLink>
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
  gap: 50px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const LinkIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: var(--light);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const BoldLink = styled(StyledLink)`
  font-weight: 700;
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

  @media (max-width: 700px) {
    display: flex;
  }
`;

/* Temporary isLogin Checkbox */

const IsLoginCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileIsLoginCheckboxContainer = styled(IsLoginCheckboxContainer)`
  display: none;
  @media (max-width: 700px) {
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
