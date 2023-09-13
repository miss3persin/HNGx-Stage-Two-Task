import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MoviePage.css";
import axios from "axios";
import star from "../assets/Star.png"
import tickets from "../assets/Two Tickets.png"
import lists from "../assets/List.png"
import best_movies from "../assets/Group 52.png"

const API_KEY = "36cdee315ca2ee3231ca252814317c61";

const MoviePage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovieDetails(response.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        // setCast(castResponse.data.cast);
        setCast(creditsResponse.data.cast.slice(0, 3));
        setDirectors(
          creditsResponse.data.crew.filter(
            (member) => member.job === "Director"
          )
        );
        setWriters(
          creditsResponse.data.crew.filter(
            (member) => member.department === "Writing"
          )
        );

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );

        const officialTrailers = trailerResponse.data.results.filter(
          (video) => video.type === "Trailer"
        );

        if (officialTrailers.length > 0) {
          setTrailerKey(officialTrailers[0].key);
        }

        setGenres(response.data.genres);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Error fetching movie details: ", error);
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (notFound) {
    return (
      <div className="checker1">
        Movie not found. <br />
        <span>
          Either that or there was a problem getting the data, try a different
          movie or try again later.
        </span>
      </div>
    );
  }

  if (!movieDetails) {
    return <div className="checker2">Loading...</div>;
  }

  return (
    <div className="main-page">
      {/* <div className="container">
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
        </div> */}

      <div className="container">
        <div className="inner-container">
          <div className="trailer">
            {trailerKey && (
              <iframe
                title="Trailer"
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                // eslint-disable-next-line react/no-unknown-property
                frameborder="0"
                allowfullscreen
              ></iframe>
            )}
          </div>

          <div className="data-container">
            <div className="movie-details">
              <div className="main-info">
                <div className="movie-title">
                  <span data-testid="movie-title">{movieDetails.title}</span>
                </div>

                <div className="release-date">
                  <span data-testid="movie-release-date">
                    <ul>
                      <li>{movieDetails.release_date}</li>
                    </ul>
                  </span>
                </div>

                <div className="runtime-container">
                  <ul>
                    <li>
                      <span data-testid="movie-runtime">
                        {movieDetails.runtime}
                      </span>{" "}
                      minutes
                    </li>
                  </ul>
                </div>

                <div className="genre">
                  {genres.length > 0 && (
                    <ul>
                      {genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="overview-container">
                <span data-testid="movie-overview">
                  {movieDetails.overview}
                </span>
              </div>

              {directors.length > 0 && (
                <div className="directors">
                  <p>Director:</p>
                  <ul>
                    {directors.map((member, index) => (
                      <li key={member.id}>
                        {member.name}
                        {index !== directors.length - 1 ? "," : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {writers.length > 0 && (
                <div className="writers">
                  <p>Writers:</p>
                  <ul>
                    {writers.map((member, index) => (
                      <li key={member.id}>
                        {member.name}
                        {index !== writers.length - 1 ? "," : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cast.length > 0 && (
                <div className="stars">
                  <p>Stars:</p>
                  <ul>
                    {cast.map((member, index) => (
                      <li key={member.id}>
                        {member.name}
                        {index !== cast.length - 1 ? "," : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="other-details">
              <div className="rating-button">
              <div className="votes">
                <div className="star-rating"><img src={star} alt="rating" /></div>
                <div className="rating">{movieDetails.vote_average.toFixed(1)}</div>
                <div className="voters"> | {movieDetails.vote_count >= 1000 ? `${Math.round(movieDetails.vote_count / 1000)}K` : movieDetails.vote_count.toString()}</div>
              </div>

              <div className="buttons">
                <div className="showtime-btn"><button className="showtime"><img src={tickets} alt="showtimes" />See Showtimes</button></div>
                <div className="watch-options-btn"><button className="watch-options"><img src={lists} alt="options" />More watch options</button></div>
              </div>
              </div>

              <div className="best-movies"><img src={best_movies} alt="best movies" /></div>

            </div>

          </div>

          {/* <div className="movie-details"></div> */}

          {/* <div className="image-container">
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
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
