import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sidebar.css"; // Import your custom CSS for additional styling

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
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
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/employees" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
              Employee List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/skills" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
              Skills Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/courses" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
              Courses Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/skill-approval" 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active' : ''}`}
            >
              Skill Approval
            </NavLink>
          </li>
          <li className="nav-item">
            <button 
              onClick={handleLogout} 
              className="nav-link text-white bg-danger w-100 text-start" // Full-width button with Bootstrap's bg-danger class
              style={{ padding: "10px 15px", borderRadius: "5px", border: "none" }} // Style can be moved to CSS
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
