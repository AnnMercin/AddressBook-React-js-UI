import React, { useState, useEffect } from "react";
import NavBarHome from "../Layouts/NavBarHome";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const user_id = { user_id: parseInt(localStorage.getItem("userData")) };
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState({
    inputs: "",
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const inputChanges = (e) => {
    const { value } = e.target;
    setSearch({ ...search, [e.target.name]: value });
    filterContacts(value);
  };

  const filterContacts = (searchTerm) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = contacts.filter((contact) =>
      Object.keys(contact).some((key) =>
        contact[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredContacts(filteredData);
  };

  const loadContacts = async () => {
    try {
      const results = await axios.get("http://localhost:8080/contacts/all", {
        params: user_id,
      });
      console.log(results.data);
      setContacts(results.data);
      setFilteredContacts(results.data);
    } catch (error) {
      console.error("There was an error fetching the contacts!", error);
    }
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:8080/contacts/${id}`);
    loadContacts();
  };

  const { inputs } = search;

  return (
    <div className="container">
      <NavBarHome data={contacts} />
      <br />
      <div>
        <h5>Contacts Search</h5>
        <input
          className="form-control border me-2"
          type="search"
          placeholder="Search Contact"
          aria-label="Search"
          name="inputs"
          value={inputs}
          onChange={(e) => inputChanges(e)}
        />
      </div>
      <br />
      <div className="contacts-list">
        <table className="table text-center border shadow">
          <thead>
            <tr>
              <th scope="id">ID</th>
              <th scope="Name">Name</th>
              <th scope="Address">Address</th>
              <th scope="Phone">Phone</th>
              <th scope="Email">Email</th>
              <th scope="Action">Action</th>
            </tr>
          </thead>
          <tfoot>Total Records {filteredContacts.length}</tfoot>
          <tbody className="table-group-divider">
            <br />
            {filteredContacts.map((contact, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.address}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/edit/${contact.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/view/${contact.id}`}
                    className="btn btn-outline-primary mx-2"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="btn btn-danger mx-2"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
