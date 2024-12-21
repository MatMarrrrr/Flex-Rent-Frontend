import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fadeIn, fadeOut } from "@/styledComponents/keyframes";
import { X as XIcon } from "lucide-react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import DateRangeCalendar from "@/components/ui/DateRangeCalendar";
import { Range } from "react-date-range";
import { RangeKeyDict } from "react-date-range";
import pl from "date-fns/locale/pl";
import { generateDisabledDates, getDateRangeString } from "@/utils/dataHelpers";
import Loader from "@/components/ui/Loader";

interface ChangePeriodModalProps {
  isVisible: boolean;
  isChanging: boolean;
  requestId: number;
  onAcceptClick: (requestId: number, selectedRange: Range) => void;
  onClose: () => void;
}

const ChangePeriodModal: React.FC<ChangePeriodModalProps> = ({
  isVisible,
  isChanging,
  requestId,
  onAcceptClick,
  onClose,
}) => {
  const [isClosing, setisClosing] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selectedRange",
  });
  const [disabledDates, setDisabledDates] = useState<Date[] | null>(null);

  const handleClose = () => {
    setisClosing(true);
    setTimeout(() => {
      onClose();
      setisClosing(false);
    }, 300);
  };

  const onDateRangeChange = (ranges: RangeKeyDict) => {
    setSelectedDateRange(ranges.selectedRange);
  };

  useEffect(() => {
    if (isVisible) {
      setDisabledDates(null);
      setSelectedDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: "selectedRange",
      });
      let reservedPeriods = [
        { startDate: "2025-02-01", endDate: "2025-02-10" },
        { startDate: "2025-02-15", endDate: "2025-02-18" },
      ];

      const disabledDates = generateDisabledDates(reservedPeriods);

      setTimeout(() => {
        setDisabledDates(disabledDates);
      }, 1000);
    }
  }, [isVisible]);

  if (!isVisible && !isClosing) return null;

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent>
        <CloseButton onClick={handleClose} $isDisabled={isChanging} />
        <ModalTitle>Wybierz nowy okres</ModalTitle>
        <SelectedRangeContainer
          $isDisabledDatesLoading={disabledDates === null}
        >
          <ModalText>Wybrany okres:</ModalText>
          <ModalText>
            {getDateRangeString({
              startDate: selectedDateRange.startDate,
              endDate: selectedDateRange.endDate,
            })}
          </ModalText>
        </SelectedRangeContainer>
        {disabledDates === null ? (
          <LoaderContainer>
            <Loader size={30} />
            <LoaderText>Wyczytywanie dostępnych okresów</LoaderText>
          </LoaderContainer>
        ) : (
          <>
            <DateRangeCalendar
              selectedDateRange={selectedDateRange}
              disabledDates={disabledDates}
              locale={pl}
              position="static"
              boxShadow="none"
              background="var(--light)"
              isBorder={true}
              disabled={isChanging}
              onSelect={onDateRangeChange}
            />
            <PrimaryButton
              disabled={isChanging}
              onClick={() => onAcceptClick(requestId, selectedDateRange)}
              desktopMaxWidth="300px"
            >
              {isChanging ? "Zmienianie" : "Zatwierdź"}
              {isChanging && <Loader size={18} />}
            </PrimaryButton>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChangePeriodModal;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  padding: 40px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

  @media (max-width: 700px) {
    margin: 0 10px;
  }

  @media (max-width: 450px) {
    padding-top: 50px;
  }
`;

const CloseButton = styled(XIcon)<{ $isDisabled: boolean }>`
  height: 35px;
  width: 35px;
  color: var(--dark);
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "auto")};

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalTitle = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--dark);

  @media (max-width: 450px) {
    font-size: 26px;
  }
`;

const SelectedRangeContainer = styled.div<{
  $isDisabledDatesLoading?: boolean;
}>`
  display: flex;
  gap: 10px;
  visibility: ${({ $isDisabledDatesLoading }) =>
    $isDisabledDatesLoading ? "hidden" : "visible"};

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ModalText = styled.p`
  font-size: 18px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LoaderText = styled.p`
  font-size: 24px;
  color: var(--dark);
  max-width: 300px;
  text-align: center;
`;
