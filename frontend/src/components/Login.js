import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import Google from "./Google";
import { loginValidation } from "../validations/LoginValidation";
import "./Login.css"; // Import the CSS file

function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            await loginValidation.validate({ email, password }, { abortEarly: false });
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
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (response.status === 200) {
                const data = await response.json();
                setUser(data);
                alert("Login successful");
                setRedirect(true);
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            alert("Login Failed");
        }
    };

    if (redirect) {
        return <Navigate to={user ? "/decision" : "/login"} />;
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="button-container">
                        <button type="submit" className="login-button">Login</button>
                        <Google className="google-button" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
