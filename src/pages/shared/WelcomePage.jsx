import { Link } from "react-router-dom";

export function WelcomePage() {
  return (
    <div className="welcome">
      <div className="box">
        <h1 className="welcome-text">
          Welcome to <span>MediCore</span>
        </h1>
        <p>
          Medicore is designed to streamline operations by enabling patients to
          book available doctor appointments and allowing doctors to efficiently
          manage their schedules
        </p>
        <div className="buttons">
          <Link className="button" to="/login">
            Login
          </Link>
          <Link className="button" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
