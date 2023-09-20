import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EventDetail({ onSubmit, formData, setFormData }) {
  let valid = false;
  const initial = {
    eventName: '',
    eventType: '', // Set to an empty string
    eventLocation: '', // Set to an empty string
    preferredGender: '',
    totalPeople: '',
    fromDate: '',
    toDate: '',
    ageGroup: '', // Set to an empty string
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event Name is required'),
    eventType: Yup.string().required('Event Type is required'),
    eventLocation: Yup.string().required('Event Location is required'),
    preferredGender: Yup.string().required('Preferred Gender is required'),
    totalPeople: Yup.number()
      .typeError('Total People must be a number')
      .required('Total People is required')
      .min(1, 'Total People must be at least 1'),
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date()
      .required('To Date is required')
      .min(Yup.ref('fromDate'), 'To Date cannot be before From Date'),
    ageGroup: Yup.string().required('Age Group is required'),
  });

  // Define a function to handle onBlur event for the eventName field
  const handleBlurEventName = (e, formik) => {
    const { name, value } = e.target;
    const allFieldsFilled = areFieldsFilled(formik.values);

    console.log(allFieldsFilled);
    if (allFieldsFilled) {
      valid = true;
    } else {
      valid = false;
    }
    // Check if the eventName field is valid and all fields are filled
    formik.validateField(name).then((error) => {
      if (!error && value && !formik.errors[name]) {
        // Update the form data only if the eventName field is valid and has a value, and all fields are filled
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          isValid: valid,
        }));
      }
    });
  };

  function areFieldsFilled(obj) {
    return Object.values(obj).every((value) => Boolean(value));
  }

  return (
    <Formik
      initialValues={initial}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="row">
          <div className="col-sm-12">
            {/* Event Name */}
            <div className="row">
              <div className="col-sm-12 w-100">
                <label htmlFor="eventName">Event Name:</label>
                <Field
                  type="text"
                  id="eventName"
                  name="eventName"
                  required
                  className={`form-control ${
                    formik.touched.eventName && formik.errors.eventName
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="eventName"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Event Type */}
            <div className="row mt-1 mb-1">
              <div className="col-sm-6">
                <label htmlFor="eventType">Event Type:</label>
                <Field
                  as="select"
                  id="eventType"
                  name="eventType"
                  required
                  className={`form-control ${
                    formik.touched.eventType && formik.errors.eventType
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                >
                  <option value="">Select Event Type</option>
                  <option value="food">Food</option>
                  <option value="sports">Sports</option>
                  <option value="football match">Football Match</option>
                </Field>
                <ErrorMessage
                  name="eventType"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Event Location */}
              <div className="col-sm-6">
                <label htmlFor="eventLocation">Event Location:</label>
                <Field
                  as="select"
                  id="eventLocation"
                  name="eventLocation"
                  required
                  className={`form-control ${
                    formik.touched.eventLocation && formik.errors.eventLocation
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                >
                  <option value="">Select Event Location</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </Field>
                <ErrorMessage
                  name="eventLocation"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Preferred Gender */}
            <div className="row mt-1 mb-1">
              <div className="col-sm-6">
                <label htmlFor="preferredGender">Preferred Gender:</label>
                <Field
                  as="select"
                  id="preferredGender"
                  name="preferredGender"
                  required
                  className={`form-control ${
                    formik.touched.preferredGender &&
                    formik.errors.preferredGender
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                >
                  <option value="">Select Preferred Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="preferredGender"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Total People Allowed */}
              <div className="col-sm-6">
                <label htmlFor="totalPeople">Total People Allowed:</label>
                <Field
                  type="number"
                  id="totalPeople"
                  name="totalPeople"
                  required
                  className={`form-control ${
                    formik.touched.totalPeople && formik.errors.totalPeople
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="totalPeople"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* From Date and To Date */}
            <div className="row mt-1 mb-1">
              <div className="col-sm-6">
                <label htmlFor="fromDate">From Date:</label>
                <Field
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  required
                  className={`form-control ${
                    formik.touched.fromDate && formik.errors.fromDate
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="fromDate"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="toDate">To Date:</label>
                <Field
                  type="date"
                  id="toDate"
                  name="toDate"
                  required
                  className={`form-control ${
                    formik.touched.toDate && formik.errors.toDate
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="toDate"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            {/* Age Group */}
            <div className="row mb-4 mt-1">
              <div className="col-sm-12">
                <label htmlFor="ageGroup">Age Group:</label>
                <Field
                  as="select"
                  id="ageGroup"
                  name="ageGroup"
                  required
                  className={`form-control ${
                    formik.touched.ageGroup && formik.errors.ageGroup
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    // Call the custom onBlur handler and pass formik as an argument
                    handleBlurEventName(e, formik);
                    // Formik's onBlur handler
                    formik.handleBlur(e);
                  }}
                >
                  <option value="">Select Age Group</option>
                  <option value="18-25">18 to 25</option>
                  <option value="26-30">26 to 30</option>
                  <option value="30-40">30 to 40</option>
                  <option value="40-50">40 to 50</option>
                  <option value="50-60">50 to 60</option>
                  <option value="60-90">60 to 90</option>
                </Field>
                <ErrorMessage
                  name="ageGroup"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EventDetail;
