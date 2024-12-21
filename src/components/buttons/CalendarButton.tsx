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
import { getDateRangeString, getPastDates } from "@/utils/dataHelpers";

interface CalendarButtonProps {
  selectedDateRange: Range;
  disabledDates: Date[];
  disabled: boolean;
  onSelect: (range: Range) => void;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({
  selectedDateRange,
  disabledDates,
  disabled = true,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Wybierz okres");
  const allDisabledDates = [...getPastDates(), ...disabledDates];

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
      <StyledButton onClick={toggleDatePicker} $disabled={disabled}>
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
            disabledDates={allDisabledDates}
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

const StyledButton = styled.button<{ $disabled: boolean }>`
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
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? "0.7" : "1")};
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
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

  .rdrDays {
    border-radius: 8px;
    overflow: hidden;
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
