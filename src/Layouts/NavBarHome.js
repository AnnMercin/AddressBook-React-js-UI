import React from "react";
import { Link } from "react-router-dom";
function NavBarHome() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="btn btn-outline-light text-center" to="/">
            Logout
          </Link>
          <a className="navbar-brand">Address Book</a>
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
          <div className="">
            <Link className="btn btn-outline-light me-2" to="/edit">
              Edit Profile
            </Link>
            <Link className="btn btn-outline-light" to="/addContact">
              Add Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBarHome;
