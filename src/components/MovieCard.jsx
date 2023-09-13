/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/MovieCard.css";

const API_KEY = "36cdee315ca2ee3231ca252814317c61";

const MovieCard = () => {
  const [popularMovie, setPopularMovie] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [clickedStates, setClickedStates] = useState(Array(3).fill(false)); // Assuming you have 3 divs

  const handleClick = (id) => {
    const newClickedStates = [...clickedStates];
    newClickedStates[id] = !newClickedStates[id];
    setClickedStates(newClickedStates);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // const response = await axios.get(
        //   `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
        // );
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        setPopularMovie(response.data.results.slice(0, 10));

      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Error fetching movie details: ", error);
        }
      }
    };

    fetchMovieDetails();
  }, []);

  if (notFound) {
    return (
      <div className="checker">
        Movie not found. <br />
        <span>
          Either that or there was a problem getting the data, try a different
          movie or try again later.
        </span>
      </div>
    );
  }

  if (!popularMovie) {
    return <div className="checker">Loading...</div>;
  }

  return (
    <div>
      <div className="grid-container">
        {popularMovie.map((movie) => (
          <div key={movie.id} className="grid-item" data-testid="movie-card">
            <div>
              <svg
                width="45"
                height="45"
                viewBox="0 0 30 30"
                fill="none"
                onClick={() => handleClick(movie.id)}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_b_4379_78)">
                  <ellipse
                    cx="15"
                    cy="15.1842"
                    rx="15"
                    ry="14.6053"
                    fill="#F3F4F6"
                    fill-opacity="0.5"
                  />
                </g>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.17157 10.4828C9.73367 8.96185 12.2663 8.96185 13.8284 10.4828L15 11.6236L16.1716 10.4828C17.7337 8.96185 20.2663 8.96185 21.8284 10.4828C23.3905 12.0038 23.3905 14.4698 21.8284 15.9908L15 22.6396L8.17157 15.9908C6.60948 14.4698 6.60948 12.0038 8.17157 10.4828Z"
                  // fill="#D1D5DB"
                  fill={clickedStates[movie.id] ? "#ff0000" : "#D1D5DB"}
                />
                <defs>
                  <filter
                    id="filter0_b_4379_78"
                    x="-2"
                    y="-1.42105"
                    width="34"
                    height="33.2105"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_4379_78"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_4379_78"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

              <div className="poster" data-testid="movie-poster">
            <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              </div>

              <div className="text-content">
                <div className="title-wrapper">
                  <h2 data-testid="movie-title">{movie.title}</h2>
                </div>

                <div className="release-date-container">
                  <p>
                    Release Date: <br />
                    <span data-testid="movie-release-date">
                      {movie.release_date}
                    </span>
                  </p>
                </div>
              </div>
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
