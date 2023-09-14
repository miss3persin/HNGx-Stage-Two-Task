import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import '../styles/SearchResults.css';
import logo from "../assets/Logo.png"
import menu from "../assets/Menu.png"
import Search1 from "../components/Search1"

const API_KEY = "36cdee315ca2ee3231ca252814317c61";

const SearchResults = () => {

    const { query} = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      console.log(query);
      if (query) {
        fetchSearchResults(query);
      }
    }, [query]);
  
    const fetchSearchResults = async (query) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results: ', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
    {loading ? (
      <div className='checker2'>Loading...</div>
    ) : searchResults.length > 0 ? (
      <MovieList movies={searchResults} />
    ) : (
      <>
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
      <div className="checker-search">Movie not in our database. <br /><span>Either that or there was a problem getting the data, try a different movie or try again later.</span></div>
      </>
    )}
  </div>
  )
}

export default SearchResults