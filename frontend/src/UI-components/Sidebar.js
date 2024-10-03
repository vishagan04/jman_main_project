// Sidebar.js
import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
//import Logout from "../Logout";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();

  const Logout=(e)=>
  { 
    e.preventDefault()
    Cookies.remove("role");
    navigate("/login")
  }
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <h5 className="sidebar-heading">Admin Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/employees" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Employee List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/add-employee" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Add Employee
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/skills" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Skills Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/courses" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Courses Management
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              onClick={Logout} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
