import { ChevronDown as ChevronDownIcon } from "lucide-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { navigationItems } from "@/consts/dashboardNavigationItems";
import DashboardNavigationList from "@/pages/dashboard/components/DashboardNavigationList";
import { DashboardRequestsNavigation } from "./DashboardRequestsNavigation";

const DashboardNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const defaultSection = "your-listings";

  const isRequestsSection = location.pathname.includes("requests");

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
        <ArrowDown $isOpen={isOpen} />
      </TitleContainer>
      <NavigationContainer>
        <DashboardNavigationList
          navigationItems={navigationItems}
          defaultSection={defaultSection}
        />
      </NavigationContainer>

      <MobileNavigationContainer $isOpen={isOpen}>
        <DashboardNavigationList
          navigationItems={navigationItems}
          defaultSection={defaultSection}
        />
      </MobileNavigationContainer>
      {isRequestsSection && <DashboardRequestsNavigation />}
    </Container>
  );
};

export default DashboardNavigation;

const Container = styled.div`
  padding: 50px 10% 50px 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--gradient);
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  pointer-events: none;
  user-select: none;

  @media (max-width: 850px) {
    pointer-events: auto;
  }
`;

const ArrowDown = styled(ChevronDownIcon)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  display: none;
  height: 40px;
  width: 40px;
  color: var(--white);

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

const MobileNavigationContainer = styled.div<{ $isOpen: boolean }>`
  display: none;
  gap: 20px;
  flex-direction: column;
  height: 100%;
  max-height: ${({ $isOpen }) => ($isOpen ? "171px" : "30px")};
  transition: max-height 0.3s ease;
  overflow: hidden;
  padding-bottom: ${({ $isOpen }) => ($isOpen ? "10px" : "0")};
  @media (max-width: 850px) {
    display: flex;
  }
`;
