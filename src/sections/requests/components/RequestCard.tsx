import styled from "styled-components";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import { calculateDaysDifference } from "@/components/buttons/CalendarButton";
import getSymbolFromCurrency from "currency-symbol-map";

interface RequestCardProps {
  request: Request;
  children: React.ReactNode;
}

interface Request {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  localization: string;
  rentedPeriod: { from: string; to: string };
}

const RequestCard: React.FC<RequestCardProps> = ({ request, children }) => {
  const calculateCost = (
    rentedPeriod: { from: string; to: string },
    price: number
  ) => {
    const daysPeriod = calculateDaysDifference(
      rentedPeriod.from,
      rentedPeriod.to
    );
    return daysPeriod * price;
  };

  return (
    <Container>
      <Image src={request.image} />
      <Wrapper>
        <Name>{request.name}</Name>
        <Category>{request.category}</Category>
        <ItemDetailContainer>
          <ItemDetailTextBold>Lokalizacja: </ItemDetailTextBold>
          <ItemDetailText>{request.localization}</ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Okres: </ItemDetailTextBold>
          <ItemDetailText>{`${request.rentedPeriod.from} - ${request.rentedPeriod.to}`}</ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Koszt: </ItemDetailTextBold>
          <ItemDetailText>
            {calculateCost(request.rentedPeriod, request.price)}
            {getSymbolFromCurrency(request.currency)}
          </ItemDetailText>
        </ItemDetailContainer>
        {children}
      </Wrapper>
    </Container>
  );
};

export default RequestCard;

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
