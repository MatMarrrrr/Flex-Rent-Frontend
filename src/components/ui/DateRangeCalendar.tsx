import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";

interface DateRangeCalendarProps {
  selectedDateRange: Range;
  disabledDates: Date[];
  locale: Locale;
  onSelect: (ranges: RangeKeyDict) => void;
}

const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  selectedDateRange,
  disabledDates,
  locale,
  onSelect,
}) => {
  return (
    <StyledDateRange>
      <DateRange
        ranges={[selectedDateRange]}
        onChange={onSelect}
        rangeColors={["var(--primary)"]}
        moveRangeOnFirstSelection={false}
        disabledDates={disabledDates}
        locale={locale}
      />
    </StyledDateRange>
  );
};

export default DateRangeCalendar;

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
