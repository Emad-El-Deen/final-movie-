import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Style from "./Navbar.module.css";

export default function Navbar(props) {
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShow(location.pathname !== "/register" && location.pathname !== "/login");
  }, [location]);

  if (!show) return null;

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${Style.navbar}`}>
      <div className="container"> 
        <div className="row w-100"> 
          <div className="col-md-4 d-flex align-items-center">
            <NavLink className={`navbar-brand ${Style.logo}`} to="/">
              MovieMight
            </NavLink>
          </div>
          <div className="col-md-4"> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {props.userData ? (
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/movies">Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/tvshows">TV Shows</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/people">People</NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${Style.navLink}`} to="/register">Register</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <ul className="navbar-nav ms-auto">
              {props.userData && (
                <li className="nav-item">
                  <button className="btn nav-link text-light" onClick={props.LogOut}>Logout</button>
                </li>
              )}
              <li className="nav-item">
              <NavLink className={`nav-link ${Style.navLink}`} to="search">
              
                <i className=" fa fa-search mx-2"></i>
              </NavLink>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
