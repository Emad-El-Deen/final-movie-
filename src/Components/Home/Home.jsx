import React, { useEffect, useState } from "react"; 
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css'; 

export default function Home() {
  const [movies, setMovies] = useState([]);  
  const [tvShows, setTvShows] = useState([]);
  const [people, setPeople] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [movieGenres, setMovieGenres] = useState([]); 
  const [tvShowGenres, setTvShowGenres] = useState([]);

  // Function to fetch trending movies
  async function getTrendingMovies() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=c9fac173689f5f01ba1b0420f66d7093`
      );
      setMovies(response.data.results.slice(0, 10)); 
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to fetch top-rated TV shows
  async function getTrendingTvShows() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=c9fac173689f5f01ba1b0420f66d7093`
      );
      setTvShows(response.data.results.slice(0, 10)); 
    } catch (error) {
      console.error(error);
      setError("Failed to fetch TV shows. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to fetch top celebrities (people)
  async function getPeople() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/person/day?api_key=c9fac173689f5f01ba1b0420f66d7093`
      );
      setPeople(response.data.results.slice(0, 10)); 
    } catch (error) {
      console.error(error);
      setError("Failed to fetch people. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // Function to fetch movie genres
  async function getMovieGenres() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=c9fac173689f5f01ba1b0420f66d7093`
      );
      setMovieGenres(response.data.genres);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movie genres. Please try again later.");
    }
  }

  // Function to fetch TV show genres
  async function getTvShowGenres() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=c9fac173689f5f01ba1b0420f66d7093`
      );
      setTvShowGenres(response.data.genres);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch TV show genres. Please try again later.");
    }
  }

  useEffect(() => {
    getTrendingMovies();
    getTrendingTvShows(); 
    getPeople(); 
    getMovieGenres();
    getTvShowGenres();
  }, []);

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>Unlimited movies, <br/>TV shows, and more</h1>
        <h5 className={styles.readyText}>Ready to watch?</h5>
      </div>



      {/* Movies Slider */}
      <div className={styles.sliderContainer} > 
        <div className={styles.trendTitle}>
           <h2>Top Rated Movies</h2>
        </div>
        {isLoading && <p>Loading movies...</p>}
        {error && <p className="error-message">{error}</p>}
        <Slider {...sliderSettings}>
          {movies.map((movie, index) => (
            <div key={movie.id} className={styles.card}>
              <div className={styles.rankNumber}>{index + 1}</div>
              <img
                src={baseUrl + movie.poster_path}
                alt={movie.title || movie.name}
                className={styles.cardImage}
              />
              <div className={styles.genres}>
                {movie.genre_ids.slice(0, 3).map((genreId) => {
                  const genre = movieGenres.find(g => g.id === genreId);
                  return genre ? (
                    <p key={genreId} className={styles.genreText}>
                      {genre.name}
                    </p>
                  ) : null;
                })}
              </div>
              <div className={styles.movieTitle}>{movie.title || movie.name}</div>
            </div>
          ))}
        </Slider>
      </div>

      {/* TV Shows Slider */}
      <div className={styles.sliderContainer} > 
        <div className={styles.trendTitle}>
           <h2>Top Rated TV Shows</h2>
        </div>
        {isLoading && <p>Loading TV shows...</p>}
        {error && <p className="error-message">{error}</p>}
        <Slider {...sliderSettings}>
          {tvShows.map((tvShow, index) => ( 
            <div key={tvShow.id} className={styles.card}>
              <div className={styles.rankNumber}>{index + 1}</div>
              <img
                src={baseUrl + tvShow.poster_path}
                alt={tvShow.title || tvShow.name}
                className={styles.cardImage}
              />
              <div className={styles.genres}>
                {tvShow.genre_ids.slice(0, 3).map((genreId) => {
                  const genre = tvShowGenres.find(g => g.id === genreId);
                  return genre ? (
                    <p key={genreId} className={styles.genreText}>
                      {genre.name}
                    </p>
                  ) : null;
                })}
              </div>
              <div className={styles.tvshowTitle}>{tvShow.title || tvShow.name}</div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Celebrities Slider */}
      <div className={styles.sliderContainer}> 
        <div className={styles.trendTitle}>
           <h2>Trending Celebrities</h2>
        </div>
        {isLoading && <p>Loading celebrities...</p>}
        {error && <p className="error-message">{error}</p>}
        <Slider {...sliderSettings}>
          {people.map((person, index) => (
            <div key={person.id} className={styles.card}>
              <div className={styles.rankNumber}>{index + 1}</div>
              <img
                src={baseUrl + person.profile_path}
                alt={person.name}
                className={styles.cardImage}
              />
              <div className={styles.movieTitle}>{person.name}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
