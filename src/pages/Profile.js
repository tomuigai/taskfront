import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const { username } = useParams(); // Paimam vartotojo vardą iš URL
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user data ir jų postai naudojant fetch
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${username}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUser(data.user);
                setPosts(data.posts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [username]);

    // Send message using fetch
    const handleSendMessage = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://localhost:5000/api/users/${username}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSuccess("Message sent successfully!");
            setMessage(""); // Clear the message field
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            {user ? (
                <div>
                    <h2>{user.username}'s Profile</h2>
                    <img
                        src={user.photoUrl}
                        alt="Profile"
                        className="img-fluid"
                        style={{ width: "150px", borderRadius: "50%" }}
                    />
                    <p>{user.username}</p>

                    <form onSubmit={handleSendMessage}>
                        <div className="mb-3">
                            <label className="form-label">Send Message</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>

                    {success && <div className="alert alert-success mt-3">{success}</div>}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <h3>Posts by {user.username}</h3>
                    <ul>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <li key={post._id}>
                                    <h5>{post.title}</h5>
                                    <p>{post.content}</p>
                                </li>
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserPage;
