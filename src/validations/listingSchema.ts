import * as yup from "yup";

export const listingSchema = yup.object().shape({
  name: yup.string().required("Nazwa przedmiotu jest wymagana"),
  category: yup.string().required("Kategoria jest wymagana"),
  price: yup.number().nullable().required("Cena jest wymagana"),
  currency: yup.string().required("Waluta jest wymagana"),
  localization: yup.string().required("Lokalizacja jest wymagana"),
  description: yup.string().required("Opis jest wymagany"),
});
