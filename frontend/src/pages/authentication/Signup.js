import React, { useState } from "react";
import "./authForm.css";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const [showPassword, setShowPassword] = useState(false); // New state for showing/hiding password

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(email, password)
    await signup(name, age, email, password);
  };

  return (
    <div className="container">
      <div className="login-content">
        <div className="content">
          <h1>Already Registered?</h1>
          <p>Login and continue your experience.</p>
          <Link className="link-button" id="signup-btn" to="/login">
            Login
          </Link>
        </div>
      </div>

      <div className="signup">
        <form action="" className="signup-form" onSubmit={handleSubmit}>
          <h1 className="title">Create Account</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="input-field">
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
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
          {/* <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div> */}
          <button className="button" disabled={isLoading}>
            Signup
          </button>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <p className="account-text">
            Already have an account?{" "}
            <a href="/login" id="login-btn2">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
