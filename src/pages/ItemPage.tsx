import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import arrowBack from "../assets/icons/arrowBack.svg";
import localizationIcon from "../assets/icons/localization.svg";
import test_item from "../assets//test_item.jpg";
import CalendarButton from "../components/buttons/CalendarButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Loader from "../components/ui/Loader";
import { Range } from "react-date-range";

export default function ItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDateRange, setSelectedDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selectedRange",
  });

  const [startDateTimestamp, setStartDateTimestamp] = useState<number>(0);
  const [endDateTimestamp, setEndDateTimestamp] = useState<number>(0);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = (selectedRange: Range) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate || !endDate) return "";

    setSelectedDateRange(selectedRange);
    setStartDateTimestamp(startDate.getTime());
    setEndDateTimestamp(endDate.getTime());
  };

  const handleRentClick = () => {
    console.log(`${startDateTimestamp}  ${endDateTimestamp}`);
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  let isLogin = true;
  return (
    <div>
      {isLoading ? (
        <LoaderContainer>
          <Loader size={50} color="var(--dark)" />
          <LoaderText>Loading item</LoaderText>
        </LoaderContainer>
      ) : (
        <Container>
          <BackContainer onClick={handleBack}>
            <ArrowBack src={arrowBack} />
            <BackText>Powrót</BackText>
          </BackContainer>
          <ItemContainer>
            <MobileBackContainer onClick={handleBack}>
              <ArrowBack src={arrowBack} />
              <BackText>Powrót</BackText>
            </MobileBackContainer>
            <ItemLeftContainer>
              <MobileItemName>Nazwa rzeczy do wypożyczenia</MobileItemName>
              <ItemImage src={test_item} />
              <ItemDescriptionContainer>
                <ItemDescriptionTitle>Opis</ItemDescriptionTitle>
                <ItemDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  nec sapien et dui ultricies congue at id leo. Etiam imperdiet,
                  erat eu dictum pharetra, metus quam luctus metus, nec laoreet
                  lectus ipsum id orci. Etiam tortor orci, convallis nec orci
                  at, tempor viverra orci. Vestibulum congue bibendum vulputate.
                </ItemDescription>
              </ItemDescriptionContainer>
            </ItemLeftContainer>
            <ItemRightContainer>
              <ItemName>Nazwa rzeczy do wypożyczenia</ItemName>
              <ItemCategory>Kategoria</ItemCategory>
              <ItemDetailsContainer>
                <ItemDetailText>100zł / Dzień</ItemDetailText>
                <ItemLocalizationContainer>
                  <ItemLocalizationIcon src={localizationIcon} />
                  <ItemDetailText>Lokalizacja</ItemDetailText>
                </ItemLocalizationContainer>
              </ItemDetailsContainer>
              {isLogin && (
                <CalendarButton
                  selectedDateRange={selectedDateRange}
                  onSelect={handleSelect}
                />
              )}
              {isLogin ? (
                <PrimaryButton
                  type="button"
                  onClick={handleRentClick}
                  disabled={startDateTimestamp === 0}
                  margin="10px 0px 20px 0px"
                  desktopMaxWidth="400px"
                  mobileStart={1230}
                  mobileMaxWidth="600px"
                >
                  Wyślij prośbę o wynajem
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  type="button"
                  onClick={handleRegisterRedirect}
                  margin="20px 0px 20px 0px"
                  desktopMaxWidth="400px"
                  mobileStart={1230}
                  mobileMaxWidth="600px"
                >
                  Zarejestruj się
                </PrimaryButton>
              )}
              <MobileItemDescriptionContainer>
                <ItemDescriptionTitle>Opis</ItemDescriptionTitle>
                <ItemDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  nec sapien et dui ultricies congue at id leo. Etiam imperdiet,
                  erat eu dictum pharetra, metus quam luctus metus, nec laoreet
                  lectus ipsum id orci. Etiam tortor orci, convallis nec orci
                  at, tempor viverra orci. Vestibulum congue bibendum vulputate.
                </ItemDescription>
              </MobileItemDescriptionContainer>
            </ItemRightContainer>
          </ItemContainer>
        </Container>
      )}
    </div>
  );
}

const LoaderContainer = styled.div`
  padding: 20px 10% 40px 10%;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 308px);
`;

const LoaderText = styled.p`
  font-size: 30px;
  color: var(--dark);
  font-weight: bold;
`;

const Container = styled.div`
  padding: 20px 10% 40px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 308px);
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: flex-start;

  &:hover {
    transform: scale(1.003);
  }

  @media (max-width: 1230px) {
    display: none;
  }
`;

const MobileBackContainer = styled(BackContainer)`
  display: none;
  margin-bottom: 0;

  @media (max-width: 1230px) {
    display: flex;
  }
`;

const ArrowBack = styled.img`
  height: 36px;
`;

const BackText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;

const ItemContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 1230px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
    max-width: 600px;
  }
`;

const ItemLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ItemRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 40px;

  @media (max-width: 1230px) {
    margin-bottom: 10px;
  }
`;

const ItemName = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 15px;

  @media (max-width: 1230px) {
    display: none;
  }
`;

const MobileItemName = styled(ItemName)`
  display: none;

  @media (max-width: 1230px) {
    display: block;
  }

  @media (max-width: 700px) {
    font-size: 24px;
  }
`;

const ItemCategory = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 5px;
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
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

const ItemDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1230px) {
    display: none;
  }
`;

const MobileItemDescriptionContainer = styled(ItemDescriptionContainer)`
  display: none;

  @media (max-width: 1230px) {
    display: flex;
  }
`;

const ItemDescriptionTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 5px;
`;

const ItemDescription = styled.p`
  font-size: 16px;
  color: var(--dark);
`;
