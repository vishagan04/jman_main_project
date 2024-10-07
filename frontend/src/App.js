import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Components
import AdminDashboard from "./admin/AdminDashboard";
import EmployeeList from "./admin/EmployeeList";
import AddEditEmployee from "./admin/AddEditEmployee";
import SkillsManagement from "./admin/SkillsManagement";
import CoursesManagement from "./admin/CoursesManagement";
import Logout from "./Logout";
import Login from "./login";

// Employee Components
import EmployeeDashboard from "./employee/EmployeeDashboard";
import EmployeeProfile from "./employee/EmployeeProfile";
import SkillAssessment from "./employee/SkillAssessment";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        {/* <Route path="/admin" element={}>
        <Route index="true" element={<AdminDashboard />} />
        </Route> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<EmployeeList />} />
        <Route path="/admin/add-employee" element={<AddEditEmployee />} />
        <Route path="/admin/skills" element={<SkillsManagement />} />
        <Route path="/admin/courses" element={<CoursesManagement />} />
        <Route path="/Login" element={<Login />} />

        {/* Employee Routes */}
        
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/assessment" element={<SkillAssessment />} />
        <Route path="/employee/logout" element={<Logout />} />
        <Route path="/employee/logout" element={<Logout />} />

      </Routes>
    </Router>
  );
};

export default App;
