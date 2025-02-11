import { Period } from "@/types/interfaces";
import { Range } from "react-date-range";

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

export const generateDisabledDates = (reservedPeriods: Period[]): Date[] => {
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

export const getDateRangeString = (selectedRange: Range | Period): string => {
  if (!selectedRange.startDate || !selectedRange.endDate) return "";

  let startDate: string | Date;
  let endDate: string | Date;

  if (isRangeType(selectedRange)) {
    startDate = formatDateForDisplay(selectedRange.startDate);
    endDate = formatDateForDisplay(selectedRange.endDate);
  } else {
    startDate = selectedRange.startDate;
    endDate = selectedRange.endDate;
  }

  return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
};

const isRangeType = (range: Range | Period): range is Range => {
  return (range as Range).startDate instanceof Date;
};
