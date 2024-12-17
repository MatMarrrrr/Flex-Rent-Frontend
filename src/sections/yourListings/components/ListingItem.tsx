import styled from "styled-components";
import { MapPin as MapPinIcon } from "lucide-react";
import Button from "@/components/buttons/Button";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";

interface ListingItemProps {
  id: number;
  image: string;
  name: string;
  category: string;
  price: string;
  localization: string;
  rentedPeriods: { from: string; to: string }[];
  onEditClick: (id: number) => void;
}

const ListingItem: React.FC<ListingItemProps> = ({
  id,
  image,
  name,
  category,
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
        <Category>{category}</Category>
        <ItemDetailsContainer>
          <ItemDetailText>{price}zł / Dzień</ItemDetailText>
          <ItemLocalizationContainer>
            <ItemLocalizationIcon />
            <ItemDetailText>{localization}</ItemDetailText>
          </ItemLocalizationContainer>
        </ItemDetailsContainer>
        {rentedPeriods.map((period, index) => (
          <ItemDetailText key={index}>
            Wypożyczone: {period.from} - {period.to}
          </ItemDetailText>
        ))}
        <Button
          fontColor="var(--white)"
          borderColor="transparent"
          background="var(--gradient)"
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onEditClick(id)}
        >
          Edytuj ogłoszenie
        </Button>
        <Button
          fontColor="var(--white)"
          borderColor="var(--error)"
          background="var(--error)"
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onEditClick(id)}
        >
          Usuń ogłoszenie
        </Button>
      </Wrapper>
    </Container>
  );
};

export default ListingItem;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1270px;
  column-gap: 70px;
  background-color: var(--white);
  padding: 30px;
  border-radius: 8px;
  border-bottom: 4px solid var(--primary);

  @media (max-width: 1320px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: none;
    place-items: center;
  }
`;

const Image = styled(SkeletonLoaderImage)`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;

  @media (max-width: 1320px) {
    max-width: 100%;
    max-width: 640px;
    margin-bottom: 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;

  @media (max-width: 1320px) {
    width: 100%;
    min-width: 100%;
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

const ItemLocalizationIcon = styled(MapPinIcon)`
  height: 18px;
  width: 18px;
`;
