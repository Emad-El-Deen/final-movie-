import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Search.module.css";

export default function Search() {
  const [allResults, setAllResults] = useState([]); // State to hold fetched movies, shows, etc.
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from multiple APIs when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const responses = await Promise.all([
            fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=c9fac173689f5f01ba1b0420f66d7093"),
            fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=c9fac173689f5f01ba1b0420f66d7093"),
            fetch("https://api.themoviedb.org/3/trending/person/day?api_key=c9fac173689f5f01ba1b0420f66d7093"),
            fetch("https://api.themoviedb.org/3/discover/tv?api_key=c9fac173689f5f01ba1b0420f66d7093"),
            fetch("https://api.themoviedb.org/3/discover/movie?api_key=c9fac173689f5f01ba1b0420f66d7093")
,
        ]);

        // Check if the responses are okay
        const dataPromises = responses.map((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        });

        const allData = await Promise.all(dataPromises);
        
        // Combine results from all APIs into a single array
        const combinedResults = allData.flatMap((data) => data.results || []);
        
        setAllResults(combinedResults); // Store fetched data in allResults state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // Handle search input change and filter results
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      // Use a Set to track unique results
      const uniqueIds = new Set();
      const filteredResults = allResults.filter((item) => {
        const isMovie = item.title && item.title.toLowerCase().includes(term);
        const isShow = item.name && item.name.toLowerCase().includes(term);

        if (isMovie || isShow) {
          // If item is not already in uniqueIds, include it in the results
          if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id); // Add the ID to the Set
            return true; // Keep this item
          }
        }
        return false; // Filter out this item
      });
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  };

  const handleMovieClick = (id) => {
    navigate(`../moviesdetails/${id}`); // Navigate to the movie details page
  };

  return (
    <div className="home container">
      <div className="w100" style={{ position: "relative" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by movie or show title..."
          className="my-3 rounded p-2 w-100"
        />
        
        {/* Conditionally render the search results grid */}
        {searchResults.length > 0 && (
          <div className="search-results-grid">
            <div className="row g-3">
              {searchResults.map((result) => (
                <div className="col-md-3 my-2" key={result.id}>
                  <div className="rounded" onClick={() => handleMovieClick(result.id)}> {/* Clickable card */}
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                          : "https://via.placeholder.com/200x300?text=No+Image"
                      }
                      alt={result.title || result.name}
                      className="w-100 rounded"
                    />
                    <div className="movie-info">
                      <h3>{result.title || result.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display no results message only if searchTerm is not empty */}
        {searchResults.length === 0 && searchTerm && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
}
