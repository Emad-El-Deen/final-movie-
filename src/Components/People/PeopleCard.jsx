import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';

export default function PeopleCard({ person }) {
  return (
    <div className="col-md-2 my-2">
      <div className="people-card mt-5 position-relative overflow-hidden">
        <Link to={`../peopledetails/${person.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt=''
          className="w-100 people-image"
        />
       
        <h1 className="people-title h5 text-center mt-2">{person.original_name}</h1> 
        </Link>
      </div>
    </div>
  );
}
