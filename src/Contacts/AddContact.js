import React, { useState } from "react";
import NavBarAddContact from "../Layouts/NavBarAddContact";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddContact() {
  let navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    userId: parseInt(localStorage.getItem("userData")),
  });

  const { name, address, phone, email, dateOfBirth } = contact;

  const inputchanges = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const results = await axios.post(
        "http://localhost:8080/contacts/new",
        contact
      );
      navigate("/home");
    } catch (error) {
      if (error.response.status === 422) {
        alert(error.response.data);
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
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3 className="text-center m-4">New Contact</h3>
          <br />
          <form onSubmit={(e) => submitForm(e)} className="text-center">
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name*"
                name="name"
                value={name}
                onChange={(e) => inputchanges(e)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address*"
                name="address"
                value={address}
                onChange={(e) => inputchanges(e)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Phone Number (optional)"
                name="phone"
                value={phone}
                onChange={(e) => inputchanges(e)}
                pattern="\d{10}"
                title="Please enter a valid phone number"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email ID"
                name="email"
                value={email}
                pattern="^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,3}$"
                onChange={(e) => inputchanges(e)}
                title="Please enter a valid email address"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="dateOfBirth" className="form-label">
                Date Of Birth
              </label>
              <input
                type="Text"
                placeholder="Enter Date Of Birth (optional)"
                className="form-control"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => inputchanges(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary mx-2">
              Submit
            </button>
            <button
              type="reset"
              onClick={() =>
                setContact({
                  name: "",
                  address: "",
                  phone: "",
                  email: "",
                  dateOfBirth: "",
                })
              }
              className="btn btn-outline-danger mx-2"
            >
              Clear
            </button>
          </form>
          <p className="text-end text-danger" color="#808080">
            * Mandatory Field
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
