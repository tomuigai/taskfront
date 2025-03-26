import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();

        if (!username || !password || !confirmPassword) {
            alert("Visi laukeliai privalomi!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Slaptažodžiai nesutampa!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, rawPassword: password }), // Siunčiame rawPassword
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registracija sėkminga! Nukreipiame į prisijungimą...");
                navigate("/login");  // Nukreipiame į prisijungimo puslapį
            } else {
                alert(data.message || "Įvyko klaida. Prašome pabandyti vėl.");
            }
        } catch (error) {
            alert("Įvyko klaida. Prašome pabandyti vėl.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registracija</h2>
            <input ref={usernameRef} type="text" placeholder="Vartotojo vardas" className="form-control my-2" />
            <input ref={passwordRef} type="password" placeholder="Slaptažodis" className="form-control my-2" />
            <input ref={confirmPasswordRef} type="password" placeholder="Patvirtinkite slaptažodį" className="form-control my-2" />
            <button onClick={handleRegister} className="btn btn-success w-100">Registruotis</button>
            <p className="mt-3">Jau turite paskyrą? <a href="/login">Prisijungti</a></p>
        </div>
    );
};

export default Register;
