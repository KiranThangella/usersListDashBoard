import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = ({ switchView }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand href="/">User Management</Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => { switchView("userList"); setExpanded(false); }}>Users List</Nav.Link>
            <Nav.Link onClick={() => { switchView("addUser"); setExpanded(false); }}>Add User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
