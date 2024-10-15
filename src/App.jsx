// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Movies from './Components/Movies/Movies';
import Home from './Components/Home/Home';
import TvShows from './Components/TvShows/TvShows';
import People from './Components/People/People';
import Layout from './Components/Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import * as jwtDecode from 'jwt-decode'; 
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import MoviesDetails from './Components/MovieDetails/MoviesDetails';
import TvShowsDetails from './Components/TvShowsDetails/TvShowsDetails';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import Search from './Components/Search/Search';



function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate;

  function saveUserData() {
    const encodeToken = localStorage.getItem("Token");
    if (encodeToken) {
      const decodeToken = jwtDecode(encodeToken); 
      setUserData(decodeToken);
      console.log("decodedToken: ", decodeToken);
    } else {
      setUserData(null);
    }
  }

  function LogOut() {
    setUserData(null);
    localStorage.removeItem("Token");
    navigate("/login");
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem("Token") == null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,  
  };
  
  useEffect(() => {
    saveUserData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout showNavbar={true} userData={userData} saveUserData={saveUserData} LogOut={LogOut} />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute><Movies /></ProtectedRoute> },
        { path: "tvshows", element: <ProtectedRoute><TvShows /></ProtectedRoute> },
        { path: "people", element: <ProtectedRoute><People /></ProtectedRoute> },
        { path: "moviesdetails/:id", element:<ProtectedRoute><MoviesDetails /></ProtectedRoute>  },
        { path: "tvshowsdetails/:id", element:<ProtectedRoute><TvShowsDetails /></ProtectedRoute>  },
        { path: "peopledetails/:id", element:<ProtectedRoute><PeopleDetails /> </ProtectedRoute> },
        { path: "search", element:<ProtectedRoute><Search /></ProtectedRoute>  },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
