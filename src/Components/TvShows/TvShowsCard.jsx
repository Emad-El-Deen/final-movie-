import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';


export default function TvShowsCard({ show }) {
  return (
    <div className="col-md-2 my-2">
      <div className="tv-card mt-5  position-relative overflow-hidden">
     
     <Link to={`../tvshowsdetails/${show.id}`}>
     <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt=''
          className="w-100 tv-image"
        />
        <div className="layer ">
          <h1 className="tv-title h3">{show.name}</h1>
        </div>
      
     </Link>
       
      </div>
    </div>
  );
}
