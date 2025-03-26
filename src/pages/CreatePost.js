import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Naudojamas nukreipimui

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sukuriame post data
        const postData = {
            title,
            description,
            time: new Date().toISOString(), // Naudojame dabartinį laiką postui
            username: "tomasltl", // Prisijungusio vartotojo vardas (priklauso nuo konteksto)
            imageUrl,
        };

        console.log("Siunčiame post duomenis: ", postData);

        try {
            const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Siunčiame tokeną
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Nepavyko sukurti posto");
            }

            const data = await response.json();
            console.log("Postas sukurtas: ", data);

            // Nukreipiame į naujai sukurtą postą
            navigate(`/post/${data._id}`);  // Nukreipiame į naują postą pagal jo ID
        } catch (error) {
            console.error("Klaida kuriant postą: ", error);
            setError("Nepavyko sukurti posto. Prašome pabandyti vėl.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sukurti naują postą</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Pavadinimas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Aprašymas</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Nuotraukos URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sukurti postą</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default CreatePost;
