import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message) => toast(message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill in all fields.");
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/employees/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Assuming the backend sends back a token and role
          const { token, role } = data; // Adjust according to your response structure

          // Store JWT in local storage
          localStorage.setItem("token", token);
          localStorage.setItem("employee", JSON.stringify(data));
          Cookies.set("role", role);

          if (role === "admin") {
            toast.success("Login Successful");
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 2000);
          } else {
            toast.success("Login Successful");
            setTimeout(() => {
              navigate("/employee/dashboard");
            }, 2000);
          }
        } else {
          toast.error("Invalid email or password.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Error logging in.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="row min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-6 border">
            <div className="login-container p-3">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control col-md-12"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
