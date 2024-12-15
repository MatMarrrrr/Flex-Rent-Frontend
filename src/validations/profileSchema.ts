import * as yup from "yup";

export const profileDataSchema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj poprawny adres e-mail")
    .required("Pole e-mail jest wymagane"),
  name: yup.string().required("Pole imie jest wymagane"),
  surname: yup.string().required("Pole nazwisko jest wymagane"),
  city: yup.string().required("Pole miasto jest wymagane"),
  province: yup.string().required("Pole województwo jest wymagane"),
});
