import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import SinglePost from "./pages/SinglePost"; // Importuojame SinglePost puslapį
import UserPage from "./pages/UserPage";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Sekame localStorage token pakeitimus
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <Router>
            {token && <Navbar />}
            <Routes>
                {!token ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/createpost" element={<CreatePost />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/post/:postId" element={<SinglePost />} /> {/* SinglePost maršrutas */}
                        <Route path="/user/:username" element={<UserPage />} /> {/* Teisingai susieta UserPage */}
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
