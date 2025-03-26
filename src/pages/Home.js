import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/posts");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleAddToFavorites = async (postId) => {
        try {
            const response = await fetch("http://localhost:5000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ postId }),
            });

            if (response.ok) {
                setFavorites([...favorites, postId]); // Atnaujiname UI
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>All Posts</h2>
            <div className="row">
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/post/${post._id}`} className="text-dark text-decoration-none">
                                            {post.title}
                                        </Link>
                                    </h5>
                                    <p className="card-text">{post.description}</p>
                                </div>

                                {/* Paveikslėlis po tekstu */}
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="img-fluid w-100"
                                        style={{height: "200px", objectFit: "cover"}}
                                    />

                                )}

                                {/* Footer su user info ir Favorite mygtuku */}
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <small>
                                        <Link to={`/user/${post.username}`} className="text-muted">
                                            @{post.username}
                                        </Link>{" "}
                                        | {new Date(post.time).toLocaleString()}
                                    </small>
                                    <button
                                        className={`btn btn-sm ${favorites.includes(post._id) ? "btn-success" : "btn-outline-primary"}`}
                                        style={{fontSize: "14px", padding: "2px 6px"}}
                                        onClick={() => handleAddToFavorites(post._id)}
                                    >
                                        ♥
                                    </button>


                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
