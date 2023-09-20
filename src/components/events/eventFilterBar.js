import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function FilterComponent() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="filterType">
          <Form.Label className="me-2"> Event Type:</Form.Label>
          <Form.Control as="select">
            <option>Food</option>
            <option>Sports</option>
            <option>Football Match</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="filterLocation">
          <Form.Label className="me-2"> Event Location:</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form.Group>

        <Form.Group as={Col} controlId="filterGender">
          <Form.Label className="me-2"> Preferred Gender:</Form.Label>
          <Form.Control as="select">
            <option>Male</option>
            <option>Female</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="filterAgeGroup">
          <Form.Label className="me-2"> Age Group:</Form.Label>
          <Form.Control as="select">
            <option>18-25</option>
            <option>26-30</option>
            <option>30-40</option>
            <option>40-50</option>
            <option>50-60</option>
            <option>60-90</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="filterFromDate">
          <Form.Label className="me-2">From Date:</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group as={Col} controlId="filterToDate">
          <Form.Label className="me-2"> To Date:</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FilterComponent;
