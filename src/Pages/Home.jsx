import {useEffect, useState} from 'react'
import Hero from '../components/Hero';
import Popular from '../components/Popular';
import Footer from '../components/Footer'
import axios from 'axios';
import '../styles/Home.css'

const API_KEY = "36cdee315ca2ee3231ca252814317c61";
const Home = () => {

  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      
      try {
        // const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);
        setTopMovies(response.data.results.slice(0, 20));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTopMovies();
  }, [])

  return (
    <>
      <Hero topMovies={topMovies}/>
      <Popular />
      <Footer />
    </>
  )
}

export default Home