import React, { useState, useEffect } from "react";
import NavBarAddContact from "../Layouts/NavBarAddContact";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditContact() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    userId: "",
  });

  const { name, address, phone, email, dateOfBirth } = contact;

  const inputChanges = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadContact();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const results = await axios.put(
        `http://localhost:8080/contacts/edit/${id}`,
        contact
      );
      if (results.data === "Updated") {
        navigate("/home");
      } else {
        alert(results.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert(error.response.data);
      } else {
        console.error("There was an error creating the user!", error);
      }
    }
  };

  const loadContact = async () => {
    const response = await axios.get(`http://localhost:8080/contacts/${id}`);
    setContact(response.data);
  };

  return (
    <div className="container">
      <NavBarAddContact />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3 className="text-center m-4">Edit Contact</h3>
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
                onChange={(e) => inputChanges(e)}
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
                onChange={(e) => inputChanges(e)}
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
                onChange={(e) => inputChanges(e)}
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
                onChange={(e) => inputChanges(e)}
                title="Please enter a valid email address"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="dateOfBirth" className="form-label">
                Date Of Birth
              </label>
              <input
                type="text"
                placeholder="Enter Date Of Birth (optional)"
                className="form-control"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => inputChanges(e)}
              />
            </div>
            <button
              type="submit"
              className=" text-center btn btn-outline-primary mx-2"
            >
              Submit
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

export default EditContact;
