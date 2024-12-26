import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  name: yup
    .string()
    .required("Pole imie jest wymagane")
    .max(255, "Imie może mieć maksymalnie 255 znaków"),
  surname: yup
    .string()
    .required("Pole nazwisko jest wymagane")
    .max(255, "Nazwisko może mieć maksymalnie 255 znaków"),
  city: yup
    .string()
    .required("Pole miasto jest wymagane")
    .max(255, "Miasto może mieć maksymalnie 255 znaków"),
  province: yup
    .string()
    .required("Pole województwo jest wymagane")
    .max(255, "Województwo może mieć maksymalnie 255 znaków"),
});
