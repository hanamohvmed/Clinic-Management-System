import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(/[!@#$%^&*_]/, "Must contain at least one special character")
    .required("Required")
});

export const registerSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  birthDate: yup.date().required("Birth date is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(/[!@#$%^&*_]/, "Must contain at least one special character")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required")
});
