import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, phone, email, password, confirmPassword } = user;

  const inputChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:8080/user/new", user);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.error);
      } else {
        console.error("There was an error creating the user!", error);
      }
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
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
          </div>
        </nav>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
          <h3 className="text-center m-4">Join In Address Book</h3>
          <br />
          <form className="text-center" onSubmit={(e) => submitForm(e)}>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => inputChanges(e)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mobile Number"
                name="phone"
                value={phone}
                onChange={(e) => inputChanges(e)}
                pattern="\d{10}"
                title="Please enter a valid phone number"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email ID"
                name="email"
                value={email}
                pattern="^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,3}$"
                onChange={(e) => inputChanges(e)}
                title="Please enter a valid email address"
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
                onChange={(e) => inputChanges(e)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => inputChanges(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary mx-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
