import '../styles/Footer.css'
import facebook from '../assets/fa-brands_facebook-square.png'
import instagram from '../assets/fa-brands_instagram.png'
import twitter from '../assets/fa-brands_twitter.png'
import youtube from '../assets/fa-brands_youtube.png'

const Footer = () => {
  return (
    <div className='bottom-part'>
        <div className='socials'>
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={twitter} alt="twitter" />
            <img src={youtube} alt="youtube" />
        </div>

        <div className='useless-info'>
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
            <p>Press Room</p>
        </div>

        <div className='copyright'>
        © 2021 MovieBox by Adriana Eka Prayudha  
        </div>
    </div>
  )
}

export default Footer