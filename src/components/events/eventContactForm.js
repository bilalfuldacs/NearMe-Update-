import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EventContactForm({ onSubmit, setFormData }) {
  const [isValid, setIsValid] = useState(false);
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    
    eventDescription: Yup.string().required('Event Description is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    whatsapp: Yup.string().required('WhatsApp is required'),
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      isValid,
    }));
  }, [isValid]);
  // Define a function to handle onBlur event for the fields
  const handleBlurField = (e, formik) => {
    const { name, value } = e.target;
    const allFieldsFilled = areFieldsFilled(formik.values);
   
    console.log(allFieldsFilled);
    if (allFieldsFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // Check if the eventName field is valid and all fields are filled
    formik.validateField(name).then((error) => {
      if (!error && value && !formik.errors[name] ) {
        // Update the form data only if the eventName field is valid and has a value, and all fields are filled
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          isValid
        }));
      }
    });
  };
  function areFieldsFilled(obj) {
    return Object.values(obj).every((value) => Boolean(value));
  }
  return (
    <Formik
      initialValues={{
        eventDescription: '',
        email: '',
        phone: '',
        whatsapp: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="row mt-3">
            <div className="col-sm-12">
              <label htmlFor="eventDescription">Event Description:</label>
              <Field
                as="textarea"
                id="eventDescription"
                name="eventDescription"
                required
                className={`form-control ${
                  formik.touched.eventDescription && formik.errors.eventDescription
                    ? 'is-invalid'
                    : ''
                }`}
                rows="4" // You can adjust the number of rows as needed
                onBlur={(e) => {
                  handleBlurField(e, formik);
                  formik.handleBlur(e);
                }}
              />
              <ErrorMessage
                name="eventDescription"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                required
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? 'is-invalid'
                    : ''
                }`}
                onBlur={(e) => {
                  handleBlurField(e, formik);
                  formik.handleBlur(e);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="phone">Phone:</label>
              <Field
                type="text"
                id="phone"
                name="phone"
                required
                className={`form-control ${
                  formik.touched.phone && formik.errors.phone
                    ? 'is-invalid'
                    : ''
                }`}
                onBlur={(e) => {
                  handleBlurField(e, formik);
                  formik.handleBlur(e);
                }}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="whatsapp">WhatsApp:</label>
              <Field
                type="text"
                id="whatsapp"
                name="whatsapp"
                required
                className={`form-control ${
                  formik.touched.whatsapp && formik.errors.whatsapp
                    ? 'is-invalid'
                    : ''
                }`}
                onBlur={(e) => {
                  handleBlurField(e, formik);
                  formik.handleBlur(e);
                }}
              />
              <ErrorMessage
                name="whatsapp"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* ... other form fields ... */}

          <br></br>
          <br></br>
          <br></br>
        </Form>
      )}
    </Formik>
  );
}

export default EventContactForm;
