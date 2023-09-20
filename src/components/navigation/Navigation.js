import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">NearMe</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link href="/create/event">Create Event</Nav.Link>
          <Nav.Link href="/display/event">Display Event</Nav.Link>
          <NavDropdown title="Profile" id="navbarDropdownMenuLink">
            <NavDropdown.Item href="/display/event">My Events</NavDropdown.Item>
            <NavDropdown.Item>Option 2</NavDropdown.Item>
            <NavDropdown.Item>Option 3</NavDropdown.Item>
            {/* Add more options as needed */}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
