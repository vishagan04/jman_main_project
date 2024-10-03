// Navbar.js
import React from "react";
import Logo from "../assets/logo.png"; // Example import for the logo
import Img from "../assets/avathar.png";

const Navbar = () => {
  return (
    <nav className="navbar  bg-921A40">
      <div className="container-fluid d-flex justify-content-between align-items-center pt-3 pb-2 border-bottom">
        <a className="navbar-brand text-dark h1" href="/Home">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          SIMPLE PAY
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="d-flex align-items-center">
          <span className="me-3">
            {localStorage.getItem("Email")
              ? localStorage.getItem("Email")
              : "Email not present"}
          </span>
          <img
            src={Img}
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
