import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function FilterComponent() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const API_KEY = 'c9fac173689f5f01ba1b0420f66d7093';

  useEffect(() => {
    // Fetch data from the API
    Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`),
    ])
      .then(async ([moviesRes, tvRes, personRes, discoverTvRes, discoverMoviesRes]) => {
        const moviesData = await moviesRes.json();
        const tvData = await tvRes.json();
        const personData = await personRes.json();
        const discoverTvData = await discoverTvRes.json();
        const discoverMoviesData = await discoverMoviesRes.json();

        const combinedData = [
          ...moviesData.results,
          ...tvData.results,
          ...personData.results,
          ...discoverTvData.results,
          ...discoverMoviesData.results
        ];

        setOriginalData(combinedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function applyFilter() {
    let filteredResults = [...originalData]; // Clone originalData for filtering

    // Filter by genre
    if (selectedGenre) {
      filteredResults = filteredResults.filter(item => item.genre_ids && item.genre_ids.includes(parseInt(selectedGenre)));
    }

    // Filter by country
    if (selectedCountry) {
      filteredResults = filteredResults.filter(item => item.origin_country && item.origin_country.includes(selectedCountry));
    }

    // Filter by language
    if (selectedLanguage) {
      filteredResults = filteredResults.filter(item => item.original_language === selectedLanguage);
    }

    // Filter by quality
    if (selectedQuality) {
      filteredResults = filteredResults.filter(item => {
        if (selectedQuality === 'HD') {
          return item.vote_average >= 7; 
        } else if (selectedQuality === 'SD') {
          return item.vote_average < 7; 
        }
        return false;
      });
    }

    // Filter by year
    if (selectedYear) {
      filteredResults = filteredResults.filter(item => {
        const releaseDate = item.release_date || item.first_air_date || '';
        return releaseDate.startsWith(selectedYear);
      });
    }

    setFilteredData(filteredResults); // Set filtered results
  }

  const handleSelectChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const resetFilter = () => {
    setFilteredData([]); // Reset filtered data
  };

  return (
    <div className="container my-4">
      <div className="row mb-4 d-flex align-items-center">
        <div className="col-md-2">
          <select className="form-select" value={selectedGenre} onChange={handleSelectChange(setSelectedGenre)}>
            <option value="">Select Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={selectedCountry} onChange={handleSelectChange(setSelectedCountry)}>
            <option value="">Select Country</option>
            <option value="US">USA</option>
            <option value="EG">Egypt</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={selectedLanguage} onChange={handleSelectChange(setSelectedLanguage)}>
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={selectedQuality} onChange={handleSelectChange(setSelectedQuality)}>
            <option value="">Select Quality</option>
            <option value="HD">HD</option>
            <option value="SD">SD</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={selectedYear} onChange={handleSelectChange(setSelectedYear)}>
            <option value="">Select Release Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="col-md-2 d-flex justify-content-between">
          <button className="btn btn-primary" onClick={applyFilter}>Filter</button>
          <button className="btn btn-danger mx-2" onClick={resetFilter}>X</button>
        </div>
      </div>

      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((movie) => (
            <div className="col-md-2 my-2" key={movie.id}>
              <div className="movie-card mt-5 position-relative overflow-hidden">
                <Link to={`../moviesdetails/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-100 movie-image"
                  />
                  <div className="layer">
                    <h1 className="movie-title h3">{movie.title || movie.name}</h1>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
