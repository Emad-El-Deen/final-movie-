import React, { useEffect, useState } from 'react';

import axios from 'axios';
import TvShowsCard from './TvShowsCard';
import FilterComponent from './../FilterComponent/FilterComponent';


export default function TvShows() {
  const [TvShows, setTvShows] = useState([]);

let num=new Array(10).fill(1).map((num,index)=>index+1)



  useEffect(() => {
    getData(1);
  }, []);

  function getData(page){

    axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=c9fac173689f5f01ba1b0420f66d7093&page=${page}`)
    .then(({data : {results}})=>{
  
      setTvShows(results)

    })
    .catch((err)=>{
  console.log(err)

    })
  }
  return (
    <>
        <FilterComponent />

        <h1 className="h3 mt-5 text-danger fw-bolder"><span>All Tv Shows</span></h1> 
        <div className="row g-4 "> 
          {TvShows.map((show) => (
            <TvShowsCard key={show.id} show={show} />
          ))}
        </div>
        <nav aria-label="Page navigation example">
  <ul class="pagination d-flex mt-5 justify-content-center ">
{num.map((number)=>(
  <li class="page-item" onClick={()=>getData(number)}>
  <a class="page-link bg-transparent text-danger" href="#">{number}</a>
  </li>
))}
  </ul>
</nav>
      </>
    
  );
}

