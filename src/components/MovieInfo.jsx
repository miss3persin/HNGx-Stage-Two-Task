import '../styles/MovieInfo.css';
import MoviePage from './MoviePage'
import Sidebar from '../components/Sidebar'


const MovieInfo = () => {
  return (
    <>
    <div className='container'>
        <Sidebar/>
        <MoviePage/>
    </div>
    </>
  )
}

export default MovieInfo