import styled from "styled-components";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";
import { Request } from "@/types/interfaces";
import {
  calculateDaysDifference,
  formatDateForDisplay,
  getDateRangeString,
} from "@/utils/dataHelpers";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

interface RequestCardProps {
  request: Request;
  children: React.ReactNode;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [requestsSection, setRequestsSection] = useState<
    "outgoing" | "incoming"
  >("incoming");

  const calculateCost = (startDate: string, endDate: string, price: number) => {
    const daysPeriod = calculateDaysDifference(startDate, endDate);
    return +(daysPeriod * price).toFixed(2);
  };
  let listing = request.listing;

  const getActionString = () => {
    switch (request.status) {
      case "waiting":
        return requestsSection === "incoming" ? "Otrzymano:" : "Wysłano:";
      case "accepted":
        return "Zaakceptowano:";
      case "declined":
        return "Odrzucono:";
      case "confirmed":
        return "Potwierdzono:";
      case "canceled":
        return "Anulowano:";
    }
  };

  const getActionDate = () => {
    const date =
      request.status === "waiting" ? request.created_at : request.updated_at;
    return formatDateForDisplay(date);
  };

  useEffect(() => {
    if (location.pathname.includes("outgoing")) {
      setRequestsSection("outgoing");
    } else {
      setRequestsSection("incoming");
    }
  }, [location.pathname]);

  return (
    <Container>
      <Image src={listing.image} />
      <Wrapper>
        <Name>{listing.name}</Name>
        <Category>{t(`category${listing.category_id}`)}</Category>
        <ItemDetailContainer>
          <ItemDetailTextBold>Lokalizacja: </ItemDetailTextBold>
          <ItemDetailText>{listing.localization}</ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Okres:</ItemDetailTextBold>
          <ItemDetailText>
            {getDateRangeString({
              startDate: request.start_date,
              endDate: request.end_date,
            })}
          </ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>Koszt: </ItemDetailTextBold>
          <ItemDetailText>
            {calculateCost(request.start_date, request.end_date, listing.price)}
            {getSymbolFromCurrency(listing.currency)}
          </ItemDetailText>
        </ItemDetailContainer>
        <ItemDetailContainer>
          <ItemDetailTextBold>{getActionString()}</ItemDetailTextBold>
          <ItemDetailText>{getActionDate()}</ItemDetailText>
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
