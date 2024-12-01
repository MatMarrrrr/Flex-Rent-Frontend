import styled from "styled-components";

export const Logo = () => {
  return (
    <LogoContainer>
      <LogoBackground>Flex Rent</LogoBackground>
      <LogoText>Flex Rent</LogoText>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 3px solid var(--white);
  height: fit-content;
  min-width: 186px;
  user-select: none;
`;

const LogoBackground = styled.span`
  font-family: "Exo 2", sans-serif;
  font-size: 40px;
  color: transparent;
  -webkit-text-stroke: 5px var(--white);
  position: absolute;
  top: 0;
  left: 0;
`;

const LogoText = styled.span`
  font-family: "Exo 2", sans-serif;
  font-size: 40px;
  color: var(--dark);
  position: relative;
`;
