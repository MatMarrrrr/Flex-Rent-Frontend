import { Link } from "react-router";
import styled from "styled-components";

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Container data-aos="fade-up">
        <Title>404</Title>
        <Subtitle>Strona nie została znaleziona</Subtitle>
        <LinkButton to="/">Powrót do strony głównej</LinkButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 308px);
  background-color: var(--light);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 96px;
  font-weight: bold;
  color: var(--dark);
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: var(--dark-50);
  margin: 20px 0;
`;

const LinkButton = styled(Link)`
  padding: 10px 20px;
  background-color: var(--dark);
  color: var(--white);
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
