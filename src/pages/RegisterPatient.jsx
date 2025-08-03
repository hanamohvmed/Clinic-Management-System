import { useFormik } from "formik";
import { useState } from "react";
import { registerSchema } from "../schemas";
import { Link } from "react-router-dom";

const onSubmit = () => {
  console.log("Submited");
};

export default function RegisterPatient() {
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
        <h3 className="login-text">Patient Register</h3>
        <Link className="role-ques" to="/RegisterDoctor">
          Are you a doctor?
        </Link>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="username-input-container">
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your username"
              onBlur={handleBlur}
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
              autoComplete="off"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              onBlur={handleBlur}
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
              autoComplete="off"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={passwordVisibility}
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
              autoComplete="off"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              onBlur={handleBlur}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "input-error"
                  : ""
              }
            />
            <span
              className="material-symbols-outlined password-toggle-icon"
              onClick={passwordVisibility}
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
