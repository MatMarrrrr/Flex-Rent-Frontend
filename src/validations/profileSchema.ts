import * as yup from "yup";

export const profileDataSchema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj poprawny adres e-mail")
    .required("Pole e-mail jest wymagane")
    .max(255, "E-mail może mieć maksymalnie 255 znaków"),
  name: yup
    .string()
    .required("Pole imie jest wymagane")
    .max(255, "Imię może mieć maksymalnie 255 znaków"),
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
