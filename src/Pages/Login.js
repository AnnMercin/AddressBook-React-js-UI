import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const { phone, password } = user;

  const inputchanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const results = await axios.get("http://localhost:8080/user/login", {
        params: {
          phone: user.phone,
          password: user.password,
        },
      });
      if (JSON.stringify(results.data) === "404") {
        alert("Invalid Mobile Number or Password");
        navigate("/");
      } else {
        localStorage.setItem("userData", results.data);
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand"></a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 broder rounder p-4 mt-3 shadow">
          <h3 className="text-center m-4">Login Address Book</h3>
          <br />
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-2">
              <label htmlFor="phone" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => inputchanges(e)}
                required
                pattern="\d{10}"
                title="Please enter a valid phone number"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => inputchanges(e)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary mx-2">
                Login
              </button>
              <Link className="btn btn-outline-primary" to="/join">
                New User
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
