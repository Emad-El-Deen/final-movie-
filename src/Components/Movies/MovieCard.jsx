import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
export default function MovieCard({ movie }) {
  return (
    <div className="col-md-2 my-2">
      <div className="movie-card mt-5  position-relative overflow-hidden">
       <Link to={`../moviesdetails/${movie.id}`}>
       <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt='s'
          className="w-100 movie-image"
        />
        <div className="layer ">
          <h1 className="movie-title h3">{movie.title}</h1>
        </div>
       
       </Link>
      </div>
    </div>
  );
}
