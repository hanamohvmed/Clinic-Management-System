import { useFormik } from "formik";
import { useState } from "react";
import { registerSchema } from "../schemas";
import { Link } from "react-router-dom";

const onSubmit = () => {
  console.log("Submitted");
};

export default function RegisterForm({
  title,
  switchRolePath,
  switchRoleText
}) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibility = () => {
    setShowPassword((pass) => !pass);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      validationSchema: registerSchema,
      onSubmit
    });

  return (
    <div className="register-page">
      <div className="reg-card">
        <h3 className="header-text">{title}</h3>
        <Link className="role-ques" to={switchRolePath}>
          {switchRoleText}
        </Link>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="username-input-container">
            <input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              autoComplete="off"
              className={
                errors.username && touched.username ? "input-error" : ""
              }
              aria-describedby="username-error"
              aria-invalid={!!(errors.username && touched.username)}
            />
            <span className="material-symbols-outlined username-icon">
              person
            </span>
          </div>
          {errors.username && touched.username && (
            <p className="error" role="alert">
              {errors.username}
            </p>
          )}

          <label htmlFor="email">Email</label>
          <div className="email-input-container">
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              autoComplete="off"
              className={errors.email && touched.email ? "input-error" : ""}
              aria-describedby="email-error"
              aria-invalid={!!(errors.email && touched.email)}
            />
            <span className="material-symbols-outlined email-icon">mail</span>
          </div>
          {errors.email && touched.email && (
            <p className="error" role="alert">
              {errors.email}
            </p>
          )}

          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              autoComplete="off"
              className={
                errors.password && touched.password ? "input-error" : ""
              }
              aria-describedby="password-error"
              aria-invalid={!!(errors.password && touched.password)}
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={passwordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.password && touched.password && (
            <p className="error" role="alert">
              {errors.password}
            </p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-container">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password again"
              autoComplete="off"
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "input-error"
                  : ""
              }
              aria-describedby="confirmPassword-error"
              aria-invalid={
                !!(errors.confirmPassword && touched.confirmPassword)
              }
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={passwordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error" role="alert">
              {errors.confirmPassword}
            </p>
          )}

          <button type="submit">Register</button>

          <p className="sign-text">
            Already have an account?{" "}
            <Link className="sign-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
