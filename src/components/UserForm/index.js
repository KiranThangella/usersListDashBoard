import React from "react";

const UserForm = ({ currentUser, isEditing, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={currentUser.firstName}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={currentUser.lastName}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={currentUser.email}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input
          type="text"
          className="form-control"
          name="department"
          value={currentUser.department}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
