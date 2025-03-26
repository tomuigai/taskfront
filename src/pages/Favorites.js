import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}/favorites`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [userId]);

    return (
        <div className="container mt-5">
            <h2>Your Favorite Posts</h2>
            {favorites.length > 0 ? (
                favorites.map((post) => (
                    <div key={post._id} className="border p-3 mb-3">
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                    </div>
                ))
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
};

export default Favorites;
