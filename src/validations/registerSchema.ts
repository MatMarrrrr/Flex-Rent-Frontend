import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj poprawny adres e-mail")
    .required("Pole e-mail jest wymagane"),
  password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej jedną dużą literę")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Hasło musi zawierać co najmniej jeden znak specjalny"
    )
    .required("Pole hasło jest wymagane"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła muszą być identyczne")
    .required("Pole potwierdzenia hasła jest wymagane"),
});
