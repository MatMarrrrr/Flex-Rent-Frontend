import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  old_password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków.")
    .max(255, "Hasło może mieć maksymalnie 255 znaków.")
    .matches(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę.")
    .matches(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Hasło musi zawierać przynajmniej jeden znak specjalny."
    )
    .required("Pole Stare hasło jest wymagane."),
  new_password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków.")
    .max(255, "Hasło może mieć maksymalnie 255 znaków.")
    .matches(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę.")
    .matches(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Hasło musi zawierać przynajmniej jeden znak specjalny."
    )
    .notOneOf(
      [yup.ref("old_password")],
      "Nowe hasło musi różnić się od starego hasła."
    )
    .required("Pole Nowe hasło jest wymagane."),
  repeat_password: yup
    .string()
    .oneOf(
      [yup.ref("new_password")],
      "Powtórzone hasło musi być identyczne z nowym hasłem."
    )
    .required("Pole Powtórz nowe hasło jest wymagane."),
});
