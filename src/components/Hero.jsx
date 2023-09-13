/* eslint-disable react/prop-types */
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from '../assets/Logo (1).png';
import menu from '../assets/Menu.png';
import '../styles/Hero.css';
import Search from '../components/Search';
import { Link } from 'react-router-dom';

const Hero = ({topMovies}) => {
  const [currentBackdrop, setCurrentBackdrop] = useState(null);


  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
    beforeChange: (current, next) => {
      // eslint-disable-next-line react/prop-types
      setCurrentBackdrop(topMovies[next]?.backdrop_path);
    },
  };

  return (
    <div className='container'>
      <div className='correction-container' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${currentBackdrop})` }}>
        <div className='overlay'>
        <nav>
          <Link to={`/`} className='custom-link'>
            <img src={logo} alt='logo' className='logo-1' />
          </Link>

            <hr style={{ backgroundColor: 'white' }}/>
          <div className='search-container'>
            <Search />
          </div>

          <div className='sign-in'>
            <p>Sign In</p>
            <img src={menu} alt='menu' />
          </div>
        </nav>

        <div className='carousel'>
        <div className='carousel-wrapper'>
          <Slider {...settings}>
            {topMovies.map((movie) => (
              <div key={movie.id} className='carousel-slide'>
                <Link to={`/movies/${movie.id}`}>
                  <div className='carousel-slide-content'>

                    <div className='title-container'>
                      <h2>{movie.title}</h2>
                    </div>
                <div className='meta-data'>
                  <div className='overview-div'>
                    <p className='overview'>
                      {movie.overview}
                    </p>
                    </div>

                    <p> <span className='extra-style'>Release date: </span><br />
                      {movie.release_date}
                    </p>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;
