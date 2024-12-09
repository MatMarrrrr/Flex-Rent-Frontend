import arrowDownWhite from "./../../assets/icons/arrowDownWhite.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navigationItems } from "../../consts/dashboardNavigationItems";
import DashboardNavigationList from "../elements/DashboardNavigationList";

const DashboardNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const defaultSection = "your-listings";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Container>
      <TitleContainer onClick={toggleMenu}>
        <Title>Dashboard</Title>
        <ArrowDown src={arrowDownWhite} isOpen={isOpen} />
      </TitleContainer>
      <NavigationContainer>
        <DashboardNavigationList
          navigationItems={navigationItems}
          defaultSection={defaultSection}
        />
      </NavigationContainer>
      <MobileNavigationContainer isOpen={isOpen}>
        <DashboardNavigationList
          navigationItems={navigationItems}
          defaultSection={defaultSection}
        />
      </MobileNavigationContainer>
    </Container>
  );
};

export default DashboardNavigation;

const Container = styled.div`
  padding: 50px 10% 50px 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: var(--gradient);
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  pointer-events: none;
  user-select: none;

  @media (max-width: 850px) {
    pointer-events: auto;
  }
`;

const ArrowDown = styled.img<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  display: none;

  @media (max-width: 850px) {
    display: block;
  }
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: var(--white);
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 850px) {
    display: none;
  }
`;

const MobileNavigationContainer = styled.div<{ isOpen: boolean }>`
  display: none;
  gap: 20px;
  flex-direction: column;
  max-height: ${({ isOpen }) => (isOpen ? "168px" : "30px")};
  transition: max-height 0.3s ease;
  overflow: hidden;

  @media (max-width: 850px) {
    display: flex;
  }
`;
