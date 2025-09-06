import React, { useEffect, useState } from "react";
import "../CSS/browse_movies.css";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const BrowseMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="browse-container">
      <Navbar />

      <div className="browse-header">
        <h1>🎥 Browse Movies</h1>
        <p>Find your next favorite film. Check showtimes, book tickets, and enjoy the show!</p>
      </div>

      {loading ? (
        <p className="loading-text">Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
                <button className="book-button">Book Now</button>
              </div>
            ))
          ) : (
            <p className="no-movies-text">No movies found.</p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BrowseMovies;
