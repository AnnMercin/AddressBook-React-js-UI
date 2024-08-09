import React, {useEffect, useState} from "react";
import NavBarAddContact from "../Layouts/NavBarAddContact";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ViewContact() {
    const [contact, setContact] = useState({
      name: "",
      address: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      userId: "",
    });
    const { id } = useParams()
    useEffect(() => {
      loadContact();
    }, []);
    const loadContact = async () => {
      const result = await axios.get(`http://localhost:8080/contacts/${id}`);
      setContact(result.data);
    };
  return (
    <div className="container">
      <NavBarAddContact />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3 className="text-center m-4">Contact Information</h3>
          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {contact.name}
                </li>
                <li className="list-group-item">
                  <b>Address:</b> {contact.address}
                </li>
                <li className="list-group-item">
                  <b>Mail:</b> {contact.email}
                </li>
                <li className="list-group-item">
                  <b>Phone:</b> {contact.phone}
                </li>
                <li className="list-group-item">
                  <b>Date of Birth:</b> {contact.dateOfBirth}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewContact;
