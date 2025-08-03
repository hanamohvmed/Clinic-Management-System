import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "../schemas";
import { Link } from "react-router-dom";

const onSubmit = () => {
  console.log("Submited");
};

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibility = () => {
    setShowPassword((pass) => !pass);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      validationSchema: loginSchema,
      onSubmit
    });
  return (
    <div className="login-page">
      <div className="log-card">
        <h3 className="login-text">Login</h3>
        <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>

          <p className="sign-text">
            Don't have an account?{" "}
            <Link className="sign-link" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
