import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuthContext } from '../../store/context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

function CustomNavbar() {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  // Conditionally render the navbar items based on the presence of a token
  const renderNavbarItems = () => {
    if (token) {
      return (
        <>
          <Nav.Link href="/events/create">Create Event</Nav.Link>
          <Nav.Link href="/events/display">Display Event</Nav.Link>
         
          <NavDropdown title="Profile" id="navbarDropdownMenuLink">
            <NavDropdown.Item href="/events/display">My Events</NavDropdown.Item>
            <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
            <NavDropdown.Item>Option 3</NavDropdown.Item>
            {/* Add more options as needed */}
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/login">Login</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">NearMe</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          {renderNavbarItems()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
