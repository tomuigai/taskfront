import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const username = localStorage.getItem("username");

    useEffect(() => {
        // Gauti postą
        fetch(`http://localhost:5000/api/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch((err) => console.error("Failed to fetch post:", err));

        // Gauti komentarus
        fetch(`http://localhost:5000/api/comments/${postId}`)
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((err) => console.error("Failed to fetch comments:", err));
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            alert("Comment cannot be empty");
            return;
        }

        const newComment = {
            text: commentText,
            username,
        };

        fetch(`http://localhost:5000/api/comments/${postId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment),
        })
            .then((res) => res.json())
            .then((data) => {
                setComments([data, ...comments]); // Pridedam naują komentarą į sąrašą
                setCommentText(""); // Išvalom lauką
            })
            .catch((err) => console.error("Failed to add comment:", err));
    };

    return (
        <div className="container mt-5">
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p><strong>Created by:</strong> {post.username}</p>
                    <p><strong>Time:</strong> {new Date(post.time).toLocaleString()}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="img-fluid" />}
                </>
            ) : (
                <p>Loading...</p>
            )}

            <h3>Comments</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="border p-2 mb-3">
                        <strong>{comment.username}</strong>
                        <p>{comment.text}</p>
                        <p className="text-muted">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}

            <h4>Add a Comment</h4>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    className="form-control"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="4"
                    required
                />
                <button type="submit" className="btn btn-primary mt-3">
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default SinglePost;
