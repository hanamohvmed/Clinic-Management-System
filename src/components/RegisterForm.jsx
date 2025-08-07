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
  const togglePassword = () => setShowPassword((prev) => !prev);

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
        <h3 className="login-text">{title}</h3>
        <Link className="role-ques" to={switchRolePath}>
          {switchRoleText}
        </Link>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="username-input-container">
            <input
              type="text"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              autoComplete="off"
              className={
                errors.username && touched.username ? "input-error" : ""
              }
            />
            <span className="material-symbols-outlined username-icon">
              person
            </span>
          </div>
          {errors.username && touched.username && (
            <p className="error">{errors.username}</p>
          )}

          <label htmlFor="email">Email</label>
          <div className="email-input-container">
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              autoComplete="off"
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <span className="material-symbols-outlined email-icon">mail</span>
          </div>
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              autoComplete="off"
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={togglePassword}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
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
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={togglePassword}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
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
