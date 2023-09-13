import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import home from '../assets/Home.png'
import calendar from '../assets/Calendar.png'
import show from '../assets/TV Show.png'
import projector from '../assets/Movie Projector.png'
import logout from '../assets/Logout.png'
import '../styles/Sidebar.css'

const sidebar = () => {
  return (
    <>
    <div className='backup'></div>
    <div className='sidebar'>
    <div className='logo-container'>
    <Link to={`/`} className="custom-link">
        <img src={logo} alt="" className='logo'/>
      </Link>
    </div>

    <div className='links-container'>
            <p><img src={home} alt="Home" /> Home</p>
            <p className='active'><img src={projector} alt="Movies" /> Movies</p>
            <p><img src={show} alt="TV Series" /> TV Series</p>
            <p><img src={calendar} alt="Upcoming" /> Upcoming</p>
    </div>

    <div className='event-container'>
        <h4>Play movie quizzes and earn free tickets</h4>
        <p>50k people are playing now</p>
        <button>start playing</button>
    </div>

    <div className='logout-container'>
        <img src={logout} alt="Logout" />
        <p>Log out</p>
    </div>
    
</div>
</>
  )
}

export default sidebar