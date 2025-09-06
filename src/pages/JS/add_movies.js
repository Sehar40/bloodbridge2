import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../CSS/add_movies.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [showtimes, setShowtimes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!title || !genre || !description || !showtimes || !imageUrl) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "movies"), {
        title,
        genre,
        description,
        showtimes,
        imageUrl,
        createdAt: Timestamp.now(),
      });

      setMessage("🎬 Movie posted successfully!");
      // Clear form fields
      setTitle("");
      setGenre("");
      setDescription("");
      setShowtimes("");
      setImageUrl("");
    } catch (err) {
      setMessage("Failed to post movie: " + err.message);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add a New Movie</h2>
      <form className="add-movie-form" onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre (e.g., Action, Comedy)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        <input
          type="text"
          placeholder="Showtimes (e.g., 3PM, 6PM, 9PM)"
          value={showtimes}
          onChange={(e) => setShowtimes(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (Poster Link)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Post Movie</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddMovie;
