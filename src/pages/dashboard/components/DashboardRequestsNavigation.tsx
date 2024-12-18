import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromRightVariants01 } from "@/consts/motionVariants";
import { Link } from "react-router";
import styled from "styled-components";

export const DashboardRequestsNavigation = () => {
  const defaultSection = "incoming";

  const checkIsRequestsSectionActive = (
    pathname: string,
    itemPath: string
  ): boolean => {
    if (pathname === "/dashboard/requests") {
      return itemPath === defaultSection;
    }
    return pathname.includes(itemPath);
  };

  return (
    <MotionWrapper variants={fromRightVariants01}>
      <RequestsNavigationContainer>
        <RequestsNavigationLink
          $isActive={checkIsRequestsSectionActive(
            location.pathname,
            "incoming"
          )}
          to="/dashboard/requests/incoming"
        >
          Przychodzące
        </RequestsNavigationLink>
        <RequestsNavigationLink
          $isActive={checkIsRequestsSectionActive(
            location.pathname,
            "outgoing"
          )}
          to="/dashboard/requests/outgoing"
        >
          Wychodzące
        </RequestsNavigationLink>
      </RequestsNavigationContainer>
    </MotionWrapper>
  );
};

const RequestsNavigationContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RequestsNavigationLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  font-size: 18px;
  color: var(--white);
  font-weight: ${({ $isActive }) => ($isActive ? "900" : "0")};
  pointer-events: ${({ $isActive }) => ($isActive ? "none" : "auto")};
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};
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
