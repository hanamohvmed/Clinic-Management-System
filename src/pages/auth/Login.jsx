import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "../../schemas/index";
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
        <h3 className="header-text">Login</h3>

        <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>

          <p className="sign-text">
            Don't have an account?{" "}
            <Link className="sign-link" to="/registerDoctor">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
