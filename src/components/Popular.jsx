import MovieCard from '../components/MovieCard'
import '../styles/Popular.css'
import right from "../assets/Chevron right.png"

const Popular = () => {
  return (
    <div >
      <div className='heading'>
      <div className='popular'>Popular Movies</div>

      <div className='see-more'>See more <img src={right} alt="" /></div>

      </div>
      
      <div className='padder'>
      < MovieCard/>
      </div>
    </div>
  )
}

export default Popular