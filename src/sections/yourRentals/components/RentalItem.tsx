import styled from "styled-components";
import Button from "@/components/buttons/Button";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";
import { calculateDaysDifference } from "@/utils/dataHelpers";
import { Period, Rental } from "@/types/interfaces";

interface RentalItemProps {
  rental: Rental;
  onSendMessageClick: (id: number) => void;
}

const RentalItem: React.FC<RentalItemProps> = ({
  rental,
  onSendMessageClick,
}) => {
  const calculateCost = (rentedPeriod: Period) => {
    const daysPeriod = calculateDaysDifference(
      rentedPeriod.startDate,
      rentedPeriod.endDate
    );
    return daysPeriod * rental.price;
  };

  return (
    <Container>
      <Image src={rental.image} />
      <Wrapper>
        <Name>{rental.name}</Name>
        <Category>Kategoria</Category>
        <ItemDetailContainer>
          <ItemDetailTextBold>Lokalizacja: </ItemDetailTextBold>
          <ItemDetailText>{rental.localization}</ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Okres: </ItemDetailTextBold>
          <ItemDetailText>{`${rental.rentedPeriod.startDate} - ${rental.rentedPeriod.endDate}`}</ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Koszt: </ItemDetailTextBold>
          <ItemDetailText>
            {calculateCost(rental.rentedPeriod)}
            {getSymbolFromCurrency(rental.currency)}
          </ItemDetailText>
        </ItemDetailContainer>
        <Button
          fontColor="var(--white)"
          borderColor="transparent"
          background="var(--gradient)"
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onSendMessageClick(rental.id)}
        >
          Wyślij wiadomość
        </Button>
      </Wrapper>
    </Container>
  );
};

export default RentalItem;

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

const ItemDetailText = styled.p`
  font-size: 16px;
  color: var(--dark);

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const ItemDetailTextBold = styled(ItemDetailText)`
  font-weight: bold;
`;

const ItemDetailContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
`;
