import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  ChevronDown as ChevronDownIcon,
  CalendarDays as CalendarDaysIcon,
} from "lucide-react";
import styled from "styled-components";
import { useState } from "react";
import pl from "date-fns/locale/pl";
import { ReservedPeriod } from "@/types/interfaces";

interface CalendarButtonProps {
  selectedDateRange: Range;
  disabledDates: Date[];
  onSelect: (range: Range) => void;
}

export const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const dateToTimestamp = (dateString: string): number => {
  const [day, month, year] = dateString.split(".");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getTime();
};

export const convertToMidnightTimestamp = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const generateDisabledDates = (
  reservedPeriods: ReservedPeriod[]
): Date[] => {
  const disabledDates: Date[] = [];

  reservedPeriods.forEach((period) => {
    const start = new Date(period.startDate);
    const end = new Date(period.endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const currentDate = new Date(start);
    while (currentDate <= end) {
      disabledDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return disabledDates;
};

export const calculateDaysDifference = (
  startDateString: string,
  endDateString: string
): number => {
  const startTimestamp = dateToTimestamp(startDateString);
  const endTimestamp = dateToTimestamp(endDateString);

  const differenceInMilliseconds = Math.abs(endTimestamp - startTimestamp);
  const daysDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return daysDifference + 1;
};

export const formatDateForDisplay = (date: Date): string => {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getDateRangeString = (selectedRange: Range): string => {
  const { startDate, endDate } = selectedRange;

  if (!startDate || !endDate) return "";

  const stringStartDate = formatDateForDisplay(startDate);
  const stringEndDate = formatDateForDisplay(endDate);

  return stringStartDate === stringEndDate
    ? stringStartDate
    : `${stringStartDate} - ${stringEndDate}`;
};

const CalendarButton: React.FC<CalendarButtonProps> = ({
  selectedDateRange,
  disabledDates,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Wybierz okres");

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const selectedRange: Range = ranges.selectedRange;
    setButtonText(getDateRangeString(selectedRange));
    onSelect(selectedRange);
  };

  return (
    <CalendarContainer>
      <StyledButton onClick={toggleDatePicker}>
        <CalendarIcon />
        {buttonText}
        <ArrowDown $isOpen={isOpen} />
      </StyledButton>
      {isOpen && (
        <StyledDateRange>
          <DateRange
            ranges={[selectedDateRange]}
            onChange={handleSelect}
            rangeColors={["var(--primary)"]}
            moveRangeOnFirstSelection={false}
            disabledDates={disabledDates}
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

const StyledButton = styled.button`
  border: none;
  border-radius: 50px;
  background-color: var(--primary);
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--dark);
  padding: 16px 0px;
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
    max-width: 500px;
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
    font-size: 13px;

    @media (max-width: 500px) {
      font-size: 12px;
    }

    @media (max-width: 350px) {
      font-size: 10px;
    }
  }

  .rdrDateDisplayWrapper {
    display: none;
  }

  .rdrMonthPicker select,
  .rdrYearPicker select {
    font-size: 15px;
    @media (max-width: 440px) {
      font-size: 14px;
    }

    @media (max-width: 340px) {
      font-size: 10px;
    }
  }
`;

const ArrowDown = styled(ChevronDownIcon)<{ $isOpen: boolean }>`
  height: 25px;
  width: 25px;
  color: var(--dark);
  margin-left: 10px;
  transition: transform 0.3s ease;

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const CalendarIcon = styled(CalendarDaysIcon)`
  height: 18px;
  width: 18px;
  margin-right: 10px;
`;
