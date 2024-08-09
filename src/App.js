import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EditContact from "./Contacts/EditContact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./Contacts/AddContact";
import ViewContact from "./Contacts/ViewContact";
import AddUser from "./Users/AddUser";
import EditUser from "./Users/EditUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="*" element={<Login />} />
          <Route exect path="/home" element={<Home />} />
          <Route exact path="/addContact" element={<AddContact />} />
          <Route exact path="/edit/:id" element={<EditContact />} />
          <Route exact path="/view/:id" element={<ViewContact/>} />
          <Route exact path="/join" element={<AddUser/>} />
          <Route exact path="/new" element={<Login />} />
          <Route exact path="/edit" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
