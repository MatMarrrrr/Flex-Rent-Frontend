import * as yup from "yup";

export const listingSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa przedmiotu jest wymagana")
    .max(255, "Nazwa przedmiotu może mieć maksymalnie 255 znaków"),
  category_id: yup.string().required("Kategoria jest wymagana"),
  price: yup.number().nullable().required("Cena jest wymagana"),
  currency: yup
    .string()
    .required("Waluta jest wymagana")
    .max(3, "Waluta może mieć maksymalnie 3 znaki"),
  localization: yup
    .string()
    .required("Lokalizacja jest wymagana")
    .max(255, "Lokalizacja może mieć maksymalnie 255 znaków"),
  description: yup.string().required("Opis jest wymagany"),
});
