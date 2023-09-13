/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import Search1 from "../components/Search1";
import menu from "../assets/Menu.png";
// import search_icon from '../assets/Search.png';
import placeholder from "../assets/No-Image-Placeholder.svg.png";
import "../styles/MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div>
      <nav>
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
              <Link to={`/movies/${movie.id}`} target="_blank">
                <div className="poster" data-testid="movie-poster">
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
