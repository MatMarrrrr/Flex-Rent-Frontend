import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import arrowDownBlack from "./../../assets/icons/arrowDownBlack.svg";
import calendarIcon from "./../../assets/icons/calendar.svg";
import styled from "styled-components";
import { useState } from "react";
import pl from "date-fns/locale/pl";

const CalendarButton = ({ selectedDateRange, onSelect }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Wybierz okres");

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  function formatDateForDisplay(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  function getDateRangeString(selectedRange: any) {
    const { startDate, endDate } = selectedRange;
    const stringStartDate = formatDateForDisplay(startDate);
    const stringEndDate = formatDateForDisplay(endDate);

    return stringStartDate === stringEndDate
      ? stringStartDate
      : `${stringStartDate} - ${stringEndDate}`;
  }

  const handleSelect = (ranges: any) => {
    const selectedRange = ranges.selectedRange;
    setButtonText(getDateRangeString(selectedRange));
    onSelect(selectedRange);
  };

  return (
    <CalendarContainer>
      <StyledButton onClick={toggleDatePicker}>
        <CalendarIcon src={calendarIcon} />
        {buttonText}
        <ArrowDown src={arrowDownBlack} isOpen={isOpen} />
      </StyledButton>
      {isOpen && (
        <StyledDateRange>
          <DateRange
            ranges={[selectedDateRange]}
            onChange={handleSelect}
            rangeColors={["var(--primary)"]}
            moveRangeOnFirstSelection={false}
            locale={pl}
          />
        </StyledDateRange>
      )}
    </CalendarContainer>
  );
};

export default CalendarButton;

const CalendarContainer = styled.div`
  position: relative;

  @media (max-width: 1230px) {
    max-width: 600px;
  }
`;

const StyledButton = styled.button<{ margin?: string }>`
  border: none;
  border-radius: 50px;
  background-color: var(--primary);
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--dark);
  padding: 16px 0px;
  margin: ${({ margin }) => margin || "0"};
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:disabled:hover {
    transform: none;
  }

  @media (max-width: 1230px) {
    max-width: 600px;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const StyledDateRange = styled.div`
  .rdrCalendarWrapper {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    color: var(--dark);
    font-family: Arial, sans-serif;
    position: absolute;
    top: 58px;
    z-index: 2;

    @media (max-width: 1230px) {
      max-width: 600px;
    }

    @media (max-width: 440px) {
      font-size: 10px;
    }

    @media (max-width: 340px) {
      font-size: 8px;
    }
  }

  .rdrMonthsVertical {
    align-items: center;
  }

  .rdrDateDisplayWrapper {
    display: none;
  }

  .rdrMonthPicker select,
  .rdrYearPicker select {
    @media (max-width: 440px) {
      font-size: 12px;
    }

    @media (max-width: 340px) {
      font-size: 10px;
    }
  }
`;

const ArrowDown = styled.img<{ isOpen: boolean }>`
  height: 25px;
  margin-left: 10px;
  transition: transform 0.3s ease;

  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const CalendarIcon = styled.img`
  height: 18px;
  margin-right: 10px;
`;
