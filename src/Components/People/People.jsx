import React, { useEffect, useState } from 'react';

import axios from 'axios';
import PeopleCard from './PeopleCard';



export default function People() {
  const [people, setPeople] = useState([]);

let num=new Array(10).fill(1).map((num,index)=>index+1)



  useEffect(() => {
    getData(1);
  }, []);

  function getData(page){

    axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=ee20f2961cc56f9f28a60f6238672a0a&page=${page}`)
    .then(({data : {results}})=>{
  
      setPeople(results)

    })
    .catch((err)=>{
  console.log(err)

    })
  }
  return (
    <>
    
        <h1 className="h3 mt-5  fw-bolder"><span>Popular Celebrities</span></h1> 
        <div className="row g-4 "> 
          {people.map((person) => (
            <PeopleCard key={person.id} person={person} />
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

