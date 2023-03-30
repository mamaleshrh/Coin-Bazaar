import React from "react";
import "./mnavbar.css";
import logo from '../SignIn/logo.png'
import { BiMenu } from 'react-icons/bi';

const Mnavbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    window.location.href = '/'
}
  return (
    <>
      {/* <div className="nav-wrapper">  */}

      <nav>
        <input className="hidden" type="checkbox" id="menuToggle" />
        <label className="menu-btn" for="menuToggle">

          <div className="menu menu123 ">
            <BiMenu />
          </div>

          {/* <div className="menu 2menu"> <BiMenu /></div> */}

        </label>
        <div className="nav-container123">
          <ul className="nav-tabs">
            <li className="nav-tab"><a href="/">Home </a></li>
            <li className="nav-tab"><a href="/dashboard">DashBoard</a></li>
            {/* <li className="nav-tab"><a href="/#why-us">Why </a></li> */}
            <li className="nav-tab"><a href="/market">Market</a></li>
            <li className="nav-tab"><a href="/messages">News-Info</a></li>
            <li className="nav-tab">
              <button className="navbutton navsign">
                <a onClick={logout}>logout</a>
              </button>
            </li>
            {/* <li className="nav-tab"><button className="navbutton navsign"><a href="/signup">sign up</a></button></li> */}
          </ul>
        </div>
      </nav>
      {/* </div> */}
    </>
  );
};

export default Mnavbar;
