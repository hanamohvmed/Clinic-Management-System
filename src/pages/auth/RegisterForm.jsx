import { useFormik } from "formik";
import { useState } from "react";
import { registerSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";


export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordVisibility = () => {
    setShowPassword((pass) => !pass);
  };

  const onSubmit = async (values, actions) => {
  try {
    const response = await fetch("https://localhost:7074/api/Auth/register-patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        birthDate: values.birthDate,
        gender: values.gender
      })
    });

    console.log(response);

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      navigate("/login");
      actions.resetForm();

    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
        initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        gender: ""
      },
      validationSchema: registerSchema,
      onSubmit
    });

  return (
    <div className="register-page">
      <div className="reg-card">
        <h3 className="header-text">Patient Register</h3>
        

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <div className="fullName-input-container">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              autoComplete="off"
              className={errors.fullName && touched.fullName ? "input-error" : ""}
              aria-describedby="fullName-error"
              aria-invalid={!!(errors.fullName && touched.fullName)}
            />
            <span className="material-symbols-outlined username-icon">person</span>
          </div>
          {errors.fullName && touched.fullName && (
            <p className="error" role="alert">{errors.fullName}</p>
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

          <label htmlFor="birthDate">Birth Date</label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={values.birthDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.birthDate && touched.birthDate ? "input-error" : ""}
          />
          {errors.birthDate && touched.birthDate && (
            <p className="error" role="alert">{errors.birthDate}</p>
          )}
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.gender && touched.gender ? "input-error" : ""}
          >
            <option value="" disabled>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && touched.gender && (
            <p className="error" role="alert">{errors.gender}</p>
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
