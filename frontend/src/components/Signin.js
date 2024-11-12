import React, { useState } from "react";
import axios from "axios";
import Google from "./Google";
import { registerValidation } from "../validations/RegisterValidation";
import "./Signin.css"; // Import the CSS file

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      await registerValidation.validate(
        { name, email, password, phone },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        phone,
      });
      alert("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (error) {
      if (error.response) {
        alert("Registration failed: " + error.response.data.message);
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="signin-card">
          <h2 className="signin-title">Sign Up</h2>
          <form onSubmit={registerUser}>
            <div className="input-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="abc@gmail.com"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="*****"
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="9999999999"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>
            <div className="button-container">
              <button type="submit" className="login-button">Sign Up</button>
              <Google className="google-button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
