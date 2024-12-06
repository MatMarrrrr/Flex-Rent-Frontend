import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  name: yup.string().required("Pole imie jest wymagane"),
  surname: yup.string().required("Pole nazwisko jest wymagane"),
  city: yup.string().required("Pole miasto jest wymagane"),
  province: yup.string().required("Pole województwo jest wymagane"),
});
