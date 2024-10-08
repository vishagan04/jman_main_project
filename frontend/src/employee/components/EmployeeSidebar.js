import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./EmployeeSidebar.css"; // Import custom CSS for additional styling

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  
  const logout = (e) => {
    e.preventDefault();
    Cookies.remove("role");
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="col-3 col-lg-2 d-md-block bg-dark sidebar text-white h-auto">
      <div className="position-fixed">
        <h5 className="sidebar-heading text-light mt-3">Employee Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink 
              to="/employee/dashboard" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/employee/profile" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/employee/assessment" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Skill Assessment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              onClick={logout} // Ensure it's using the correct function name
              className="nav-link text-white bg-danger" // Bootstrap's bg-danger class
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default EmployeeSidebar;
