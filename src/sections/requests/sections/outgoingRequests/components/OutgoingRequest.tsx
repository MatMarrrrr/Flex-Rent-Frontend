import styled from "styled-components";
import Button from "@/components/buttons/Button";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import { calculateDaysDifference } from "@/components/buttons/CalendarButton";
import getSymbolFromCurrency from "currency-symbol-map";
import { X as XIcon, Check as CheckIcon, Send as SendIcon } from "lucide-react";

type RequestStatus = "accepted" | "declined" | "waiting" | "canceled";

interface OutgoingRequestProps {
  request: Request;
  onCancelClick: (requestId: number) => void;
  onSendMessageClick: (chatId: number) => void;
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
  status: RequestStatus;
}

const OutgoingRequest: React.FC<OutgoingRequestProps> = ({
  request,
  onCancelClick,
  onSendMessageClick,
}) => {
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

        {request.status !== "accepted" && (
          <Button
            desktopMaxWidth="500px"
            mobileStart={1320}
            mobileMaxWidth="700px"
            margin="20px 0px 0px 0px"
            disabled={request.status === "canceled"}
            onClick={() => onCancelClick(request.id)}
          >
            <XIcon />
            {request.status === "waiting" && "Anuluj Prośbę"}
            {request.status === "canceled" && "Anulowano"}
          </Button>
        )}

        {request.status == "waiting" && (
          <RequestStatusText>
            <CheckIcon />
            Prośba wysłana
          </RequestStatusText>
        )}

        {request.status === "accepted" && (
          <Button
            desktopMaxWidth="500px"
            mobileStart={1320}
            mobileMaxWidth="700px"
            margin="20px 0px 0px 0px"
            onClick={() => onSendMessageClick(request.id)}
          >
            <SendIcon />
            Wyślij wiadomość
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default OutgoingRequest;

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

const RequestStatusText = styled.p`
  color: var(--dark);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  font-size: 20px;
  max-width: 500px;
`;

const ItemDetailTextBold = styled(ItemDetailText)`
  font-weight: bold;
`;

const ItemDetailContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
`;
