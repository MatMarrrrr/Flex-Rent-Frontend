import * as yup from "yup";

export const loginSchema = yup.object().shape({
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
  remember: yup.boolean().default(false),
});
