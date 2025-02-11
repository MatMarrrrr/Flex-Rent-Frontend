import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import {
  MoveLeft as ArrowBackIcon,
  MapPin as MapPinIcon,
  Send as SendIcon,
  Pencil as PencilIcon,
  CalendarDays as CalendarDaysIcon,
} from "lucide-react";
import test_item from "@/assets/test_item.jpg";
import CalendarButton from "@/components/buttons/CalendarButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Loader from "@/components/ui/Loader";
import { Range } from "react-date-range";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";
import ErrorLayout from "@/components/ui/ErrorLayout";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import {
  convertToMidnightTimestamp,
  generateDisabledDates,
  getDateRangeString,
} from "@/utils/dataHelpers";

export default function ItemPage() {
  const { isLogin } = useUser();
  const { notify } = useToast();
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
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const [isRequestSending, setIsRequestSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  let reservedPeriods = [
    { startDate: "2025-02-01", endDate: "2025-02-10" },
    { startDate: "2025-02-15", endDate: "2025-02-18" },
  ];

  const disabledDates = generateDisabledDates(reservedPeriods);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = (selectedRange: Range) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate || !endDate) return;

    setSelectedDateRange(selectedRange);
    setStartDateTimestamp(convertToMidnightTimestamp(startDate.getTime()));
    setEndDateTimestamp(convertToMidnightTimestamp(endDate.getTime()));
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleRentClick = () => {
    setIsRequestSending(true);
    setTimeout(() => {
      setIsRequestSending(false);
      setIsRequestSent(true);
      console.log(`${startDateTimestamp}  ${endDateTimestamp}`);
      notify("Prośba o wynajem została wysłana", "success");
    }, 1000);
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

  let isOwner = false;

  if (error) {
    return <ErrorLayout message={error} />;
  }

  return isLoading ? (
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
                <PencilIcon /> Edytuj
              </PrimaryButton>
            )}

            {isLogin && !isOwner && !isRequestSent && (
              <>
                <CalendarButton
                  selectedDateRange={selectedDateRange}
                  disabledDates={disabledDates}
                  onSelect={handleSelect}
                  disabled={isRequestSending}
                />
                <PrimaryButton
                  type="button"
                  onClick={handleRentClick}
                  disabled={startDateTimestamp === 0 || isRequestSending}
                  margin="10px 0px 10px 0px"
                  desktopMaxWidth="500px"
                  mobileStart={1230}
                  mobileMaxWidth="600px"
                  mobileFontSize="16px"
                >
                  <SendIcon />
                  Wyślij prośbę o wynajem
                  {isRequestSending && <Loader size={18} />}
                </PrimaryButton>
              </>
            )}

            {isLogin && !isOwner && isRequestSent && (
              <RequestStatusContainer>
                <RequestStatusText $isBold={true}>
                  <SendIcon />
                  Prośba została wysłana
                </RequestStatusText>
                <RequestStatusText>
                  <CalendarDaysIcon />
                  <RequestStatusText $isBold={true}>
                    Wybrany okres:
                  </RequestStatusText>
                  <RequestStatusText>
                    {getDateRangeString({
                      startDate: selectedDateRange.startDate,
                      endDate: selectedDateRange.endDate,
                    })}
                  </RequestStatusText>
                </RequestStatusText>
              </RequestStatusContainer>
            )}
          </ItemRightContainer>
        </ItemContentWrapper>
        <ItemDescriptionContainer>
          <ItemDescriptionTitle>Opis</ItemDescriptionTitle>
          <ItemDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
            sapien et dui ultricies congue at id leo. Etiam imperdiet, erat eu
            dictum pharetra, metus quam luctus metus, nec laoreet lectus ipsum
            id orci. Etiam tortor orci, convallis nec orci at, tempor viverra
            orci. Vestibulum congue bibendum vulputate.
          </ItemDescription>
        </ItemDescriptionContainer>
      </ItemContainer>
    </Container>
  );
}

const ItemContentWrapper = styled.div`
  display: flex;
  gap: 50px;

  @media (max-width: 1330px) {
    flex-direction: column;
    gap: 10px;
  }
`;

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

const RequestStatusText = styled.div<{ $isBold?: boolean }>`
  color: var(--dark);
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: ${({ $isBold }) => ($isBold ? "bold" : "normal")};
  gap: 10px;

  @media (max-width: 1420px) {
    font-size: 18px;
  }
`;

const RequestStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  justify-content: start;
  gap: 20px;
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

  @media (max-width: 1330px) {
    display: none;
  }

  @media (max-width: 500px) {
    margin-left: 0%;
  }
`;

const MobileBackContainer = styled(BackContainer)`
  display: none;
  margin: 0 0 10px 0;

  @media (max-width: 1330px) {
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
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 30px;
  gap: 30px;
  max-width: 1400px;
  border-radius: 8px;

  @media (max-width: 1330px) {
    gap: 10px;
    padding-top: 20px;
    max-width: 600px;
  }
`;

const ItemLeftContainer = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: 8px;
`;

const ItemRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  flex-grow: 1;

  @media (max-width: 1330px) {
    min-width: 100%;
  }
`;

const ItemImage = styled(SkeletonLoaderImage)`
  width: 600px;
  height: auto;
  max-height: 400px;
  border-radius: 8px;

  @media (max-width: 1330px) {
    margin-bottom: 10px;
    width: 100%;
    max-height: 100%;
  }
`;

const ItemName = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 15px;

  @media (max-width: 1330px) {
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
  max-width: 50%;

  @media (max-width: 1330px) {
    max-width: 100%;
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
