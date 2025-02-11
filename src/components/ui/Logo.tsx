import styled from "styled-components";
import { Link } from "react-router";

const Logo = () => {
  return (
    <LogoContainer to="/">
      <LogoText>Flex Rent</LogoText>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled(Link)`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  height: fit-content;
  min-width: 186px;
  user-select: none;
  text-decoration: none;
`;

const LogoText = styled.span`
  font-family: "Exo 2", sans-serif;
  font-size: 40px;
  color: var(--white);
  position: relative;
`;
