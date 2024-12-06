import { footerLinksData } from "./../../consts/footerLinksData";
import styled from "styled-components";
import Logo from "./Logo";
import emailIcon from "./../../assets/icons/email.svg";
import facebookIcon from "./../../assets/icons/facebook.svg";
import linkedinIcon from "./../../assets/icons/linkedin.svg";

const Footer = () => {
  return (
    <Container>
      <LeftWrapper>
        <Logo />
        <Icons>
          <IconContainer>
            <Icon src={emailIcon} />
          </IconContainer>
          <IconContainer>
            <Icon src={facebookIcon} />
          </IconContainer>
          <IconContainer>
            <Icon src={linkedinIcon} />
          </IconContainer>
        </Icons>
      </LeftWrapper>
      <RightWrapper>
        {footerLinksData.map((section, index) => (
          <LinksContainer key={index}>
            <LinksTitle>{section.title}</LinksTitle>
            {section.links.map((link, linkIndex) => (
              <LinkElement key={linkIndex}>{link}</LinkElement>
            ))}
          </LinksContainer>
        ))}
      </RightWrapper>
    </Container>
  );
};

export default Footer;

const LeftWrapper = styled.div`
  display: flex;
  gap: 180px;
  margin-bottom: 30px;

  @media (max-width: 1300px) {
    justify-content: space-between;
    gap: 20px;
    width: 100%;
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  gap: 180px;

  @media (max-width: 1300px) {
    justify-content: space-between;
    gap: 20px;
    width: 100%;
  }
`;

const Container = styled.div`
  background-color: var(--dark);
  padding: 40px 10% 60px 10%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;

  @media (max-width: 1300px) {
    align-items: center;
  }
`;

const IconContainer = styled.div`
  border-radius: 50px;
  border: 2px solid var(--light);
  display: flex;
  padding: 5px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinksTitle = styled.p`
  color: var(--light);
  font-weight: 700;
  margin-bottom: 10px;
`;

const LinkElement = styled.p`
  color: var(--light);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;
