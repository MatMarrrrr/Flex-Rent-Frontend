import styled from "styled-components";
import localizationIcon from "../../assets/icons/localization.svg";
import Button from "../buttons/Button";

interface ListingItemProps {
  id: number;
  image: string;
  name: string;
  price: string;
  localization: string;
  rentedPeriods: { from: string; to: string }[];
  onEditClick: (id: number) => void;
}

const ListingItem: React.FC<ListingItemProps> = ({
  id,
  image,
  name,
  price,
  localization,
  rentedPeriods,
  onEditClick,
}) => {
  return (
    <Container>
      <Image src={image} />
      <Wrapper>
        <Name>{name}</Name>
        <Category>Kategoria</Category>
        <ItemDetailsContainer>
          <ItemDetailText>{price}zł / Dzień</ItemDetailText>
          <ItemLocalizationContainer>
            <ItemLocalizationIcon src={localizationIcon} />
            <ItemDetailText>{localization}</ItemDetailText>
          </ItemLocalizationContainer>
        </ItemDetailsContainer>
        {rentedPeriods.map((period, index) => (
          <ItemDetailText key={index}>
            Wypożyczone: {period.from} - {period.to}
          </ItemDetailText>
        ))}
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onEditClick(id)}
        >
          Edytuj ogłoszenie
        </Button>
      </Wrapper>
    </Container>
  );
};

export default ListingItem;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1250px;
  column-gap: 70px;

  @media (max-width: 1320px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: none;
    place-items: center;
  }
`;

const Image = styled.img`
  width: 600px;
  border-radius: 8px;

  @media (max-width: 1320px) {
    width: 100%;
    max-width: 700px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;

  @media (max-width: 1320px) {
    width: 100%;
    max-width: 700px;
  }
`;

const Name = styled.p`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 1320px) {
    font-size: 26px;
  }
`;

const Category = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  @media (max-width: 430px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const ItemDetailText = styled.p`
  font-size: 16px;
  color: var(--dark);

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const ItemLocalizationContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ItemLocalizationIcon = styled.img`
  height: 18px;
  width: 18px;
`;
