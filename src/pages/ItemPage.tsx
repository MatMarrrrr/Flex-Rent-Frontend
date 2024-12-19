import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import { MapPin as MapPinIcon } from "lucide-react";
import test_item from "@/assets/test_item.jpg";
import CalendarButton from "@/components/buttons/CalendarButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Loader from "@/components/ui/Loader";
import { Range } from "react-date-range";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";
import ErrorLayout from "@/components/ui/ErrorLayout";
import { useUser } from "@/contexts/UserContext";

export default function ItemPage() {
  const { isLogin } = useUser();
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
  const [error, setError] = useState<string>("");

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

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleRentClick = () => {
    console.log(`${startDateTimestamp}  ${endDateTimestamp}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/edit-listing/${id}`);
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Nieprawidłowy identyfikator ogłoszenia.");
      setIsLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  let isRequestSent = false;
  let isOwner = false;

  if (error) {
    return <ErrorLayout message={error} />;
  }

  return (
    <div>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie ogłoszenia</LoaderText>
        </LoaderContainer>
      ) : (
        <Container>
          <BackContainer onClick={handleBack}>
            <ArrowBack />
            <BackText>Powrót</BackText>
          </BackContainer>
          <ItemContainer>
            <MobileBackContainer onClick={handleBack}>
              <ArrowBack />
              <BackText>Powrót</BackText>
            </MobileBackContainer>

            <ItemContentWrapper>
              <ItemLeftContainer>
                <ItemImage src={test_item} />
              </ItemLeftContainer>

              <ItemRightContainer>
                <ItemName>Nazwa rzeczy do wypożyczenia</ItemName>
                <ItemCategory>Kategoria</ItemCategory>
                <ItemDetailsContainer>
                  <ItemDetailText>
                    100{getSymbolFromCurrency("PLN")} / Dzień
                  </ItemDetailText>
                  <ItemLocalizationContainer>
                    <ItemLocalizationIcon />
                    <ItemDetailText>Lokalizacja</ItemDetailText>
                  </ItemLocalizationContainer>
                </ItemDetailsContainer>
                {isLogin && !isOwner && !isRequestSent && (
                  <CalendarButton
                    selectedDateRange={selectedDateRange}
                    onSelect={handleSelect}
                  />
                )}
                {!isLogin && (
                  <PrimaryButton
                    type="button"
                    onClick={handleRegisterRedirect}
                    margin="20px 0px 20px 0px"
                    desktopMaxWidth="500px"
                    mobileStart={1230}
                    mobileMaxWidth="600px"
                  >
                    Zarejestruj się
                  </PrimaryButton>
                )}

                {isLogin && isOwner && id && (
                  <PrimaryButton
                    type="button"
                    onClick={() => handleEditClick(id)}
                    margin="20px 0px 20px 0px"
                    desktopMaxWidth="500px"
                    mobileStart={1230}
                    mobileMaxWidth="600px"
                  >
                    Edytuj
                  </PrimaryButton>
                )}

                {isLogin && !isOwner && isRequestSent && (
                  <PrimaryButton
                    type="button"
                    disabled={true}
                    margin="10px 0px 20px 0px"
                    desktopMaxWidth="500px"
                    mobileStart={1230}
                    mobileMaxWidth="600px"
                  >
                    Wysłano prośbę
                  </PrimaryButton>
                )}

                {isLogin && !isOwner && !isRequestSent && (
                  <PrimaryButton
                    type="button"
                    onClick={handleRentClick}
                    disabled={startDateTimestamp === 0}
                    margin="10px 0px 20px 0px"
                    desktopMaxWidth="500px"
                    mobileStart={1230}
                    mobileMaxWidth="600px"
                  >
                    Wyślij prośbę o wynajem
                  </PrimaryButton>
                )}
              </ItemRightContainer>

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
            </ItemContentWrapper>
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
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  padding: 20px 10% 40px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light);
  min-height: calc(100vh - 308px);

  @media (max-width: 500px) {
    padding: 0;
  }
`;

const ItemContentWrapper = styled.div`
  display: contents;

  @media (max-width: 1230px) {
    display: flex;
    flex-direction: column;
  }
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0px 0px 10px 10px;
  max-width: 1400px;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.003);
  }

  @media (max-width: 1230px) {
    display: none;
  }

  @media (max-width: 500px) {
    margin-left: 0%;
  }
`;

const MobileBackContainer = styled(BackContainer)`
  display: none;
  margin: 0 0 10px 0;

  @media (max-width: 1230px) {
    display: flex;
  }
`;

const ArrowBack = styled(ArrowBackIcon)`
  height: 36px;
  width: 36px;
  stroke-width: 1.5;
`;

const BackText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;

const ItemContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(2, 1fr);
  background-color: var(--white);
  padding: 30px;
  max-width: 1400px;
  border-radius: 8px;

  @media (max-width: 1230px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding-top: 20px;
    max-width: 600px;
  }
`;

const ItemLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemImage = styled(SkeletonLoaderImage)`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;

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
    font-size: 28px;
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

const ItemLocalizationIcon = styled(MapPinIcon)`
  height: 18px;
  width: 18px;
  color: var(--dark);
`;

const ItemDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
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
