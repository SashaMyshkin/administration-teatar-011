import { parse, isValid, format } from "date-fns";

export const validateDate = (
  dateString: string
): { error: boolean; message: string } => {
  if (dateString === "")
    return {
      error: true,
      message: "Obavezan podatak",
    };
  const regex = /^\d{2}\. \d{2}\. \d{4}/;
  if (!regex.test(dateString))
    return {
      error: true,
      message: "Neispravan format datuma.",
    };

  const parsedDate = parse(dateString, "dd. MM. yyyy", new Date());

  if (!isValid(parsedDate))
    return {
      error: true,
      message: "Nepostojeći datum.",
    };

  return {
    error: false,
    message: "",
  };
};

export const isEmailValid = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export function formatDateInput(input:string) {
  // Remove all non-digit characters
  let cleaned = input.replace(/\D/g, '');

  // Limit the input to 8 digits (ddMMyyyy)
  cleaned = cleaned.substring(0, 8);

  // Split the cleaned input into day, month, and year
  let day = cleaned.substring(0, 2);
  let month = cleaned.substring(2, 4);
  let year = cleaned.substring(4, 8);

  // Construct the formatted date string
  let formattedDate = '';
  if (day) {
      formattedDate += day;
      if (month) {
          formattedDate += '. ' + month;
          if (year) {
              formattedDate += '. ' + year;
          }
      }
  }

  return formattedDate;
}

export function convertToDbDate(dateString: string): string {
  // Parse the input date string into a Date object
  const parsedDate = parse(dateString, 'dd. MM. yyyy', new Date());

  // Format the Date object into `yyyy-MM-dd` format
  return format(parsedDate, 'yyyy-MM-dd');
}