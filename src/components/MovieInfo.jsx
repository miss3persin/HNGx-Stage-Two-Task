import '../styles/MovieInfo.css';
import MoviePage from './MoviePage'
import Sidebar from './sidebar'


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