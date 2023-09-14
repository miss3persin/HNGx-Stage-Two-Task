/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import Search1 from "../components/Search1";
import menu from "../assets/Menu.png";
// import search_icon from '../assets/Search.png';
import placeholder from "../assets/No-Image-Placeholder.svg.png";
import "../styles/MovieList.css";
import IMDB from "../assets/IMBD.png";
import tomatoes from "../assets/tomatoes.png"

const API_KEY = "36cdee315ca2ee3231ca252814317c61";

const MovieList = ({ movies }) => {
  const [genres, setGenres] = useState([]);
  const [clickedStates, setClickedStates] = useState(Array(3).fill(false));

  const handleClick = (id) => {
    const newClickedStates = [...clickedStates];
    newClickedStates[id] = !newClickedStates[id];
    setClickedStates(newClickedStates);
  };


  const fetchTopMovies = async () => {
    try {
      const genreResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      setGenres(genreResponse.data.genres);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchTopMovies();

  return (
    <div>
      <nav className="navbar">
        <Link to={`/`} className="custom-link">
          <img src={logo} alt="logo" className="logo-1" />
        </Link>
        <hr />
        <div className="search-container">
          <Search1 />
        </div>

        <div className="sign-in2">
          <p>Sign In</p>
          <img src={menu} alt="menu" />
        </div>
      </nav>

      <div>
        <div className="grid-container">
          {movies.map((movie) => (
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
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="1"
                      />
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
                <Link to={`/movies/${movie.id}`} target="_blank">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <img
                      src={placeholder}
                      alt="no image available"
                      className="no-image"
                    />
                  )}
                </Link>
              </div>

              {/* <div className="text-content">
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
                </div> */}

              <div className="text-content">
                <div className="title-date">
                  <div className="release-date-container">
                    <p>
                      <span data-testid="movie-release-date">
                        {movie.release_date}
                      </span>
                    </p>
                  </div>

                  <div className="title-wrapper">
                    <h2 data-testid="movie-title">{movie.title}</h2>
                  </div>
                </div>

                <div className="ratings">
                  <div className="imdb-rating">
                  <div className="img"><img src={IMDB} alt="IMDB ratings" /></div>
                  {movie.vote_average.toFixed(1)*10}.0 / 100
                  </div>

                  <div className='tomatoes-rating'>
                  <div className="img"><img src={tomatoes} alt="rotten tomatoes ratings" /></div>
                  {movie.vote_average.toFixed(1)*10}%
                  </div>

                </div>

                <div className="genres">
                  {movie.genre_ids.map((genreId, index) => {
                    const genre = genres.find((genre) => genre.id === genreId);
                    return genre ? (
                      <span key={genre.id}>
                        {genre.name}
                        {index !== movie.genre_ids.length - 1 ? "," : ""}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
