import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarAddContact from "../Layouts/NavBarAddContact";

function EditUser() {
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

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/user/${parseInt(localStorage.getItem("userData"))}`
    );
    setUser(response.data);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/user/edit/${parseInt(
          localStorage.getItem("userData")
        )}`,
        user
      );
      alert(response.data);
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
      <NavBarAddContact />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
          <h3 className="text-center m-4">Update Your Profile</h3>
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
                required
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
              <label htmlFor="confirmPassword" className="form-label">
                Enter Password
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
