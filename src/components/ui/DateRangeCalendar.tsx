import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";

interface DateRangeCalendarProps {
  selectedDateRange: Range;
  disabledDates: Date[];
  locale: Locale;
  position?: string;
  boxShadow?: string;
  background?: string;
  isBorder?: boolean;
  disabled?: boolean;
  onSelect: (ranges: RangeKeyDict) => void;
}

const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  selectedDateRange,
  disabledDates,
  locale,
  position,
  boxShadow,
  background,
  isBorder,
  disabled = false,
  onSelect,
}) => {
  return (
    <StyledDateRange
      $position={position}
      $boxShadow={boxShadow}
      $background={background}
      $isBorder={isBorder}
      $isDisabled={disabled}
    >
      <DateRange
        ranges={[selectedDateRange]}
        onChange={onSelect}
        rangeColors={["var(--primary)"]}
        moveRangeOnFirstSelection={false}
        disabledDates={disabledDates}
        locale={locale}
        minDate={new Date()}
      />
    </StyledDateRange>
  );
};

export default DateRangeCalendar;

const StyledDateRange = styled.div<{
  $position?: string;
  $boxShadow?: string;
  $background?: string;
  $isBorder?: boolean;
  $isDisabled?: boolean;
}>`
  width: fit-content;

  .rdrCalendarWrapper {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: ${({ $boxShadow }) => $boxShadow || "var(--shadow)"};
    pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "auto")};
    background-color: ${({ $background }) => $background || "var(--white)"};
    color: var(--dark);
    border: ${({ $isBorder }) =>
      $isBorder ? "2px solid var(--dark)" : "none"};

    font-family: Arial, sans-serif;
    position: ${({ $position }) => $position || "absolute"};
    top: 58px;
    z-index: 2;
    padding: 10px;

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
