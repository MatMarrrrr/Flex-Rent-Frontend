import styled from "styled-components";
import {
  MapPin as MapPinIcon,
  Pencil as PencilIcon,
  X as XIcon,
} from "lucide-react";
import Button from "@/components/buttons/Button";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";
import { Listing } from "@/types/interfaces";
import { useTranslation } from "react-i18next";
import { getDateRangeString } from "@/utils/dataHelpers";

interface ListingItemProps {
  listing: Listing;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const ListingItem: React.FC<ListingItemProps> = ({
  listing,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Image src={listing.image} />
      <Wrapper>
        <Name>{listing.name}</Name>
        <Category>{t(`category${listing.category_id}`)}</Category>
        <ItemDetailsContainer>
          <ItemDetailText>
            {listing.price}
            {getSymbolFromCurrency(listing.currency)} / Dzień
          </ItemDetailText>
          <ItemLocalizationContainer>
            <ItemLocalizationIcon />
            <ItemDetailText>{listing.localization}</ItemDetailText>
          </ItemLocalizationContainer>
        </ItemDetailsContainer>
        <ReservedPeriodsContainer>
          {listing.reserved_periods && listing.reserved_periods.length > 0 && (
            <>
              <ItemDetailText>Zarezerwowane: </ItemDetailText>
              {listing.reserved_periods.map((period, index) => (
                <ItemDetailText key={index}>
                  {getDateRangeString({
                    startDate: period.start_date,
                    endDate: period.end_date,
                  })}
                </ItemDetailText>
              ))}
            </>
          )}
        </ReservedPeriodsContainer>
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onEditClick(listing.id)}
        >
          <ItemEditIcon />
          Edytuj ogłoszenie
        </Button>
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          onClick={() => onDeleteClick(listing.id)}
        >
          <ItemDeleteIcon /> Usuń ogłoszenie
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
  max-height: 350px;
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

const ItemEditIcon = styled(PencilIcon)`
  height: 18px;
  width: 18px;
`;

const ItemDeleteIcon = styled(XIcon)`
  height: 22px;
  width: 22px;
`;

const ReservedPeriodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
