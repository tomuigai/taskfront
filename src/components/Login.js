import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!username || !password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Jei loginas sėkmingas, išsaugome username ir token į localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("token", data.token);

            navigate("/");  // Nukreipiame į pagrindinį puslapį
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <input ref={usernameRef} type="text" placeholder="Username" className="form-control my-2" />
            <input ref={passwordRef} type="password" placeholder="Password" className="form-control my-2" />
            <button onClick={handleLogin} className="btn btn-primary w-100">Login</button>
            <p className="mt-3">Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default Login;
