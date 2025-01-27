import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import AppNavbar from './components/Navbar'

class App extends Component {
  state = {
    users: JSON.parse(sessionStorage.getItem("users")) || [],
    currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || { id: "", firstName: "", lastName: "", email: "", department: "" },
    error: "",
    isEditing: false,
    currentPage: Number(sessionStorage.getItem("currentPage")) || 1,
    usersPerPage: 5,
    searchQuery: "",  // New state for search query
    activeView: "userList",  // To track the active view (userList, addUser, editUser)
    foundUser: null, // To store the user found from the search query
  };

  componentDidMount() {
    if (this.state.users.length === 0) {
      this.fetchUsers();
    }
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ users: response.data }, () => {
        sessionStorage.setItem("users", JSON.stringify(this.state.users));
      });
    } catch (error) {
      this.setState({ error: "Failed to fetch users." });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedUser = { ...prevState.currentUser, [name]: value };
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return { currentUser: updatedUser };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isEditing, users, currentUser } = this.state;

    if (isEditing) {
      const updatedUsers = users.map((user) => (user.id === currentUser.id ? currentUser : user));
      this.setState({
        users: updatedUsers,
        isEditing: false,
        currentUser: { id: "", firstName: "", lastName: "", email: "", department: "" },
        activeView: "userList",  // Return to user list view after submission
      }, () => {
        sessionStorage.setItem("users", JSON.stringify(this.state.users));
        sessionStorage.removeItem("currentUser");
      });
    } else {
      const newUser = { ...currentUser, id: users.length + 1 };
      const updatedUsers = [...users, newUser];
      this.setState({
        users: updatedUsers,
        currentUser: { id: "", firstName: "", lastName: "", email: "", department: "" },
        activeView: "userList",  // Return to user list view after submission
      }, () => {
        sessionStorage.setItem("users", JSON.stringify(this.state.users));
        sessionStorage.removeItem("currentUser");
      });
    }
  };

  handleEdit = (user) => {
    this.setState({ currentUser: user, isEditing: true, activeView: "editUser" }, () => {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    });
  };

  handleDelete = (id) => {
    this.setState({ users: this.state.users.filter((user) => user.id !== id) }, () => {
      sessionStorage.setItem("users", JSON.stringify(this.state.users));
    });
  };

  handlePageChange = (direction) => {
    this.setState((prevState) => {
      const newPage = direction === "next" ? prevState.currentPage + 1 : prevState.currentPage - 1;
      sessionStorage.setItem("currentPage", newPage);
      return { currentPage: newPage };
    });
  };

  // Handle Search Query Change
  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, foundUser: null, error: "" });
  };

  // Handle Search by Exact User ID
  handleSearch = () => {
    const { users, searchQuery } = this.state;
    const foundUser = users.find((user) => user.id.toString() === searchQuery);

    if (foundUser) {
      this.setState({ foundUser, error: "" });
    } else {
      this.setState({ foundUser: null, error: "No data found for the given User ID." });
    }
  };

  // Switch view
  switchView = (view) => {
    this.setState({ activeView: view });
  };

  render() {
    const { users, error, currentPage, usersPerPage, searchQuery, isEditing, currentUser, activeView, foundUser } = this.state;

    // Filter users based on search query for user list (if no exact match)
    const filteredUsers = users.filter(user => user.id.toString().includes(searchQuery));

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <ErrorBoundary>
          <AppNavbar switchView={this.switchView} />
        <div className="container mt-5">
         

          {/* Search Bar */}
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by User ID"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
            <button className="btn btn-primary mt-3" onClick={this.handleSearch}>
              Search
            </button>
          </div>

          {/* Show Error or No Data Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Show User Details if found */}
          {foundUser && (
            <div className="user-details mt-4">
              <h4>User Details</h4>
              <p><strong>ID:</strong> {foundUser.id}</p>
              <p><strong>Name:</strong> {foundUser.firstName} {foundUser.lastName}</p>
              <p><strong>Email:</strong> {foundUser.email}</p>
              <p><strong>Department:</strong> {foundUser.department}</p>
            </div>
          )}

          {/* Render views based on activeView state */}
          {activeView === "userList" && !foundUser && (
            <div>
              {error && <div className="alert alert-danger">{error}</div>}
              <UserList users={currentUsers} onEdit={this.handleEdit} onDelete={this.handleDelete} />
              <div className="d-flex justify-content-between mt-3 flex-wrap">
                <button className="btn btn-primary mb-2" onClick={() => this.handlePageChange("prev")} disabled={currentPage === 1}>Previous</button>
                <button className="btn btn-primary mb-2" onClick={() => this.handlePageChange("next")} disabled={indexOfLastUser >= filteredUsers.length}>Next</button>
              </div>
            </div>
          )}

          {activeView === "addUser" && (
            <div>
             
              <UserForm
                currentUser={currentUser}
                isEditing={false}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </div>
          )}

          {activeView === "editUser" && (
            <div>

              <UserForm
                currentUser={currentUser}
                isEditing={isEditing}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
