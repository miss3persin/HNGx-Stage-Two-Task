import MovieCard from '../components/MovieCard'
import '../styles/Popular.css'

const Popular = () => {
  return (
    <div >
      <div className='heading'>Popular Movies</div>
      <div className='padder'>
      < MovieCard/>
      </div>
    </div>
  )
}

export default Popular