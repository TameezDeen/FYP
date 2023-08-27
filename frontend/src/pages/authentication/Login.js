import React, { useState } from "react";
import "./authForm.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false); // New state for showing/hiding password
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    //await login(email, password);
    const loginResult = await login(email, password);

    if(loginResult.success){
      navigate("/questionnaire");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"} // Show text when checkbox is checked
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {/* Checkbox to toggle show/hide password */}
          <div className="password-checkbox">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="show-password-text">Show Password</label>
          </div>
          <button className="forgot-password-btn" disabled={isLoading}>
            Forgot password?
          </button>
          <button className="button" disabled={isLoading}>
            Login
          </button>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <p className="account-text">
            Don't have an account?{" "}
            <a href="/signup" id="sign-up-btn2">
              Sign up
            </a>
          </p>
        </form>
      </div>

      <div className="signup-content">
        <div className="content">
          <h1>New Here?</h1>
          <p>Create an account and discover great music email</p>
          <Link
            className="link-button"
            id="signup-btn"
            to="/signup"
            disabled={isLoading}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
