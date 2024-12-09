import { Link, useLocation } from "react-router";
import styled from "styled-components";

const DashboardNavigationList = ({
  navigationItems,
  defaultSection,
}: {
  navigationItems: { path: string; label: string }[];
  defaultSection: string;
}) => {
  const location = useLocation();

  const checkIsActive = (pathname: string, itemPath: string): boolean => {
    if (pathname === "/dashboard") {
      return itemPath === defaultSection;
    }
    return pathname.includes(itemPath);
  };

  return navigationItems.map((item) => (
    <NavigationItem
      key={item.path}
      $isActive={checkIsActive(location.pathname, item.path)}
      to={`/dashboard/${item.path}`}
    >
      {item.label}
    </NavigationItem>
  ));
};

export default DashboardNavigationList;

const NavigationItem = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  font-size: 20px;
  font-weight: ${({ $isActive }) => ($isActive ? "900" : "0")};
  color: var(--white);
  pointer-events: ${({ $isActive }) => ($isActive ? "none" : "auto")};
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};

  &:hover {
    color: ${({ $isActive }) => ($isActive ? "var(--white)" : "var(--dark)")};
  }

  @media (max-width: 850px) {
    order: ${({ $isActive }) => ($isActive ? "0" : "1")};
  }
`;
