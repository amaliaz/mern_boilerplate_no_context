import React from "react";
import api from "../api";
import logo from "../logo.svg";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout();
  }

  return (
    <nav className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">MERN Street Art</h1>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/map">Map</NavLink>
      <NavLink to="/new-street-art">New Street Art</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
      <NavLink to="/login">Login</NavLink>

      <Link to="/" onClick={handleLogoutClick}>
        Logout
      </Link>

      <NavLink to="/secret">Secret</NavLink>
    </nav>
  );
}

export default withRouter(MainNavbar);
