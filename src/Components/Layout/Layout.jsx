
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({ showNavbar = true, userData, saveUserData, LogOut }) {
  const location = useLocation(); 
  const navigate = useNavigate();

  return (
    <>

      {showNavbar && <Navbar userData={userData} setUserData={saveUserData} LogOut={LogOut} />} 
      <div className="container"><Outlet /> </div>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
    </>
  );
}
