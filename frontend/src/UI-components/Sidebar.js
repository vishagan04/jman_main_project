import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sidebar.css"; // Import your custom CSS for additional styling

const Sidebar = () => {
  const navigate = useNavigate();

  const Logout = (e) => { 
    e.preventDefault();
    Cookies.remove("role");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="col-3 col-lg-2 d-md-block bg-dark sidebar text-white h-auto">
      <div className="position-fixed">
        <h5 className="sidebar-heading text-light mt-3">Admin Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/employees" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Employee List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/skills" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Skills Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/courses" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
              style={{ padding: "10px 15px", borderRadius: "5px" }}
            >
              Courses Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              onClick={Logout} 
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

export default Sidebar;
