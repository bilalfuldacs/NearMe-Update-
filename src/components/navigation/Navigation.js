import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuthContext } from '../../store/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; 

function CustomNavbar() {

  const { token } = useAuthContext();

  // Conditionally render the navbar items based on the presence of a token
  const renderNavbarItems = () => {
    if (token) {
      return (
        <>
          <Nav.Link as={Link} to="/events/create">Create Event</Nav.Link>
          <Nav.Link as={Link} to="/events/display">Display Event</Nav.Link>
         
          <NavDropdown title="Profile" id="navbarDropdownMenuLink">
            <NavDropdown.Item as={Link} to="/events/MyEvents">My Events</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/logout">Log Out</NavDropdown.Item>
            <NavDropdown.Item>Option 3</NavDropdown.Item>
            {/* Add more options as needed */}
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">NearMe</Navbar.Brand>
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
