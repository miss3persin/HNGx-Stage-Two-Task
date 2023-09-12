import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MoviePage.css";
import axios from "axios";
import placeholder from "../assets/No-Image-Placeholder.svg.png"

const API_KEY = "36cdee315ca2ee3231ca252814317c61";

const MoviePage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [posterPath, setPosterPath] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovieDetails(response.data);
        setPosterPath(response.data.poster_path);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }else{console.error("Error fetching movie details: ", error)}
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (notFound) {
    return <div className="checker1">Movie not found. <br /><span>Either that or there was a problem getting the data, try a different movie or try again later.</span></div>;
  }

  if (!movieDetails) {
    return <div className="checker2">Loading...</div>;
  }
  

  return (
    <div className="main-page">
      <div className="container">
      <div className="movie-details">

        <div className="movie-title">
         Title: <span data-testid="movie-title">{movieDetails.title}</span>
        </div>

      <div className="release-date">
        Release Date (UTC):{" "}
        <span data-testid="movie-release-date">
          {movieDetails.release_date}
        </span>
      </div>

      <div className="runtime-container">
        Runtime: <span data-testid="movie-runtime">{movieDetails.runtime}</span>{" "}
        minutes
      </div>

      <div className="overview-container">
        <span className="styling">Overview:</span> <br /><br />
        <span data-testid="movie-overview">{movieDetails.overview}</span>
      </div>
      </div>

      <div className="image-container">
          {posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={movieDetails.title}
            />
          ) : <img
          src={placeholder}
          alt="no image available"
          className="no-image"
        />}
        </div>
        </div>
    </div>
  );
};

export default MoviePage;
