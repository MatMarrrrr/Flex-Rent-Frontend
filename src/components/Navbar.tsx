import { Link } from "react-router-dom";
import styled from "styled-components";
import dashboardIcon from "./../assets/icons/bell.svg";
import profileIcon from "./../assets/icons/profile.svg";
import { HamburgerButton } from "./HamburgerButton";
import { useState } from "react";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  let isLogin = true;
  return (
    <>
      <Container>
        <Logo />
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
        <HamburgerButton
          isOpen={isOpen}
          toggleMobileNavbar={toggleMobileNavbar}
        />
      </Container>
      <MobileNavbarContainer isOpen={isOpen}>
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
      </MobileNavbarContainer>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10%;
  background: var(--gradient);
`;

const NavbarLogo = styled.div`
  color: #041b2b;
  font-size: 40px;
  padding: 10px;
  font-family: "Exo 2", sans-serif;
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

const MobileNavbarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background: var(--dark);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  display: none;
  flex-direction: column;
  padding: 80px 40px;
  gap: 20px;

  @media (max-width: 700px) {
    display: flex;
  }
`;
