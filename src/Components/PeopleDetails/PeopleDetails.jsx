import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

export default function PeopleDetails() {

let{id}=useParams();
const[peopleDetails,setPeopleDetails]=useState({})

useEffect(()=>{
getPeople(id)
},[])

function getPeople(id){
    axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`)


    .then(({data})=>{
setPeopleDetails(data)
    })
    .catch((err)=>{
        console.log(err)
    })



}



  return (
  <>
  
  <div className="row mt-5">
    <div className="col-md-3">
      <div >
        <img src={`https://image.tmdb.org/t/p/w500${peopleDetails.profile_path}`} alt=""  className='w-100' />
      </div>
    </div>
    <div className="col-md-8 offset-1 d-flex align-items-center">
     <div>
     <h2 >{peopleDetails.name}</h2>
   <p className='text-white mt-3' >{peopleDetails.biography}</p>
<div className='mt-4'>
<h2 className='h6 '><span>Birthday:</span> {peopleDetails.birthday}</h2>
   <h2 className='h6 '><span>Popularity:</span> {peopleDetails.popularity}</h2>
   <h2 className='h6 '><span>Department:</span> {peopleDetails.known_for_department}</h2>
</div>

     </div>
    </div>
  </div>
  
  </>
  )
}
