import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Style from "./Navbar.module.css";

export default function Navbar(props) {
  const [show, setShow] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShow(
      location.pathname !== "/register" && location.pathname !== "/login"
    );
  }, [location]);

  if (!show) return null;

  const toggleNavbar = () => setIsCollapsed((prev) => !prev);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${Style.navbar}`}>
      <div className="container">
        <div className="row w-100">
          <div className="col-md-4 d-flex align-items-center">
            <NavLink className={`navbar-brand ${Style.logo}`} to="/">
              MovieMight
            </NavLink>
            {/* Toggle button for small screens */}
            <button
              className={`navbar-toggler ${Style.toggleButton}`}
              onClick={toggleNavbar}
              aria-label="Toggle navigation"
              type="button"
            >
              ☰
            </button>
          </div>
          <div className="col-md-8">
            <div
              className={`collapse navbar-collapse ${
                isCollapsed ? "collapse" : "show"
              } justify-content-end`}
              id="navbarSupportedContent"
            >
              <ul className={`navbar-nav mb-2 mb-lg-0 ${Style.navLinks}`}>
                {props.userData ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? Style.activeLink : Style.navLink
                          } nav-link ${Style.navLink}`
                        }
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? Style.activeLink : Style.navLink
                          } nav-link ${Style.navLink}`
                        }
                        to="/movies"
                      >
                        Movies
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? Style.activeLink : Style.navLink
                          } nav-link ${Style.navLink}`
                        }
                        to="/tvshows"
                      >
                        TV Shows
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? Style.activeLink : Style.navLink
                          } nav-link ${Style.navLink}`
                        }
                        to="/people"
                      >
                        People
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <button
                        className={`btn nav-link text-light ${Style.logoutButton}`}
                        onClick={props.LogOut}
                      >
                        Logout
                      </button>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            isActive ? Style.activeLink : Style.navLink
                          } nav-link ${Style.navLink}`
                        }
                        to="search"
                      >
                        <i className="fa fa-search mx-2"></i>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${Style.navLink}`}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={`nav-link ${Style.navLink}`}
                        to="/register"
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
