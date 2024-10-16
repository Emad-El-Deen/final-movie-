import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // For the slider
import './style.css';
import { Link, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome icons
import ReactStars from 'react-rating-stars-component'; // Import React Rating Stars

export default function MoviesDetails() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [rating, setRating] = useState(0); // State for rating

  useEffect(() => {
    getMovie(id);
  }, [id]);

  function getMovie(id) {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`)
      .then(({ data }) => {
        setMovieDetails(data);
        if (data.genres && data.genres.length > 0) {
          const genreIds = data.genres.map((genre) => genre.id);
          getRelatedMovies(genreIds);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRelatedMovies(genreIds, callback) {
    const genres = genreIds.join(',');

    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=c9fac173689f5f01ba1b0420f66d7093&with_genres=${genres}`)
      .then(({ data }) => {
        const related = data.results.slice(0, 10);
        setRelatedMovies(related);
        if (callback) {
          callback(related);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const ratingConfig = {
    size: 20,
    count: 5,
    value: rating,
    color: "gray",
    activeColor: "yellow",
    onChange: (newRating) => {
      setRating(newRating);
    },
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Movie details */}
      <div className="row mt-5">
        <div className="col-md-4 col-sm-12">
          <div className="image">
            {movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt=""
                className="w-100"
              />
            ) : (
              <img
                src="/img/1.png"
                alt=""
                className="w-100"
              />
            )}
          </div>
        </div>
        <div className="col-md-7 offset-1 d-flex align-items-center ">
        
         <div className=''>
            <h2>{movieDetails.title}</h2>
            <h1 className="h6 mt-3">
              {movieDetails.genres
                ? movieDetails.genres.map((genre) => (
                    <span key={genre.id} className="badge me-3 text-bg-primary">
                      {genre.name}
                    </span>
                  ))
                : ""}
            </h1>
            <p className="text-white mt-3">{movieDetails.overview}</p>
            <ul className="mt-5 p-0">
              <div className="d-flex flex-wrap">
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-money-bill-wave me-2"></i> {/* Budget Icon */}
                  <span>Budget: </span> {movieDetails.budget}
                </li>
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-star me-2"></i> {/* Vote Icon */}
                  <span>Vote : </span>{Math.trunc(movieDetails.vote_average)}
                </li>
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-globe me-2"></i> {/* Country Icon */}
                  <span>Origin Country:</span> {movieDetails.origin_country}
                </li>
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-fire me-2"></i> {/* Popularity Icon */}
                  <span>Popularity: </span> {Math.trunc(movieDetails.popularity)}
                </li>
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-calendar-alt me-2"></i> {/* Release Date Icon */}
                  <span>Release date: </span> {movieDetails.release_date}
                </li>
                <li className="mb-2 col-md-6 col-12">
                  <i className="fas fa-language me-2"></i> {/* Language Icon */}
                  <span>Language:</span> {movieDetails.original_language}
                </li>
              </div>
            </ul>

            {/* Rating option */}
            <div className="rating mt-5">
              <h1 className="text-white h5">Rate this movie:</h1>
              <ReactStars {...ratingConfig} />
            </div>
          </div>
         
        </div>
      </div>

      {/* Related movies */}
      <div className="related-movies mt-5">
        <h3 className="text-white">Related Movies</h3>
        <Slider {...settings}>
          {relatedMovies.map((movie) => (
            <div key={movie.id} className="related-movie-item p-3">
              <Link className="text-white" to={`/movies/${movie.id}`}>
                <img
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/img/1.png"}
                  alt={movie.title}
                  className="w-100"
                />
                <h1 className="text-center h5 mt-2">{movie.title}</h1>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
